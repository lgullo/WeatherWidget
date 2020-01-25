import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { CurrentWeatherModel } from './data/CurrentWeatherModel';
import WeatherIconUtil from "./config/weather-icon-util";
import { FiveDayWeatherModel } from './data/FiveDayWeatherModel';
import { Theme, light, dark } from "./data/Theme";
import { IpcRenderer } from 'electron';
import { UserPreferences } from './data/UserPreferences';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weather-widget';

  currentWeather: CurrentWeatherModel;
  fiveDayWeather: FiveDayWeatherModel;

  fiveDayForecast: Map<string, { date: string, high: number, low: number, weatherId: number, time: number}>;
  listFiveDayForecast: Array<{ date: string, high: number, low: number, weatherId: number, time: number}>;
  fiveDayForecastLoaded: boolean = false;
  currentWeatherLoaded: boolean = false;
  currentTimeString: string = "N/A";
  currentDateString: string = "N/A";

  unitOfTemperature: string = "F";
  activeTheme: Theme = dark;

  userPreferences: UserPreferences;
  isElectron: boolean = false;

  private ipc: IpcRenderer;

  constructor(private weatherApiService: WeatherApiService) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
        this.isElectron = true;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  ngOnInit() {

    if (this.isElectron) {
      this.userPreferences = this.ipc.sendSync('loadUserPreferences', 'ping');
    }
    
    // Load user preferences into local object
    // this.userPreferences = this.ipc.sendSync('loadUserPreferences', 'ping');
    if (this.userPreferences == null) {
      this.userPreferences = new UserPreferences();
      this.userPreferences.activeTheme = dark;
      this.userPreferences.unitOfTemperature = 'F';
      this.setDarkTheme();
    } else {
      this.setTheme(this.userPreferences.activeTheme);
    }

    this.updateCurrentTime();
    this.getTodaysForecast();
    this.getFiveDayForecast();

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

    setInterval(() => {
      this.updateWeather();
    }, 300000); // Refresh weather data every 5 minutes
  }

  saveUserPerferences(){
    if (this.isElectron) {
      console.log("SAVING USER PREFERENCE", this.userPreferences);
      this.ipc.sendSync('saveUserPreferences', this.userPreferences);
    } 
  }

  updateCurrentTime() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dateTime = new Date();
    let amOrpm = 'AM';
    let hours = dateTime.getHours();
    if (hours > 12) {
      hours = hours % 12;
      amOrpm = 'PM';
    }
    let minutes = dateTime.getMinutes().toString();
      if (dateTime.getMinutes() < 10) {
        minutes = '0' + minutes;
      }
    this.currentTimeString = hours + ':' + minutes + ' ' + amOrpm;
    this.currentDateString = months[dateTime.getMonth()] + '. ' + dateTime.getDate();
  }

  updateWeather() {
    this.getTodaysForecast();
    this.getFiveDayForecast();
  }

  getTodaysForecast() {
    this.weatherApiService.getCurrentForecastByZipCode('26554').subscribe(response => {
      this.currentWeather = response;
      this.currentWeatherLoaded = true;
    })
  }

  getFiveDayForecast() {
    this.weatherApiService.getFiveDayForecastByZipCode('26554').subscribe(response => {
      this.fiveDayWeather = response;
      this.fiveDayForecast = new Map<string, { date: string, high: number, low: number, weatherId: number, time: number }>();
      this.fiveDayWeather.list.forEach(item => {
        
        let currentDate = new Date();
        let itemDate = new Date(item.dt * 1000);

        // Make sure the forecast we are looking at is tomorrow and on (NOT TODAY)
        if (currentDate.getFullYear() <= itemDate.getFullYear() && currentDate.getMonth() <= itemDate.getMonth() && currentDate.getDate() < itemDate.getDate()) {
          let key = itemDate.getMonth() + 1 + '/' + itemDate.getDate();
          if (this.fiveDayForecast.has(key)) {
            if (this.fiveDayForecast.get(key).high < item.main.temp_max) {
              this.fiveDayForecast.get(key).high = item.main.temp_max;
            }
            if (this.fiveDayForecast.get(key).low > item.main.temp_min) {
              this.fiveDayForecast.get(key).low = item.main.temp_min;
            }
          } else {
            this.fiveDayForecast.set(key, { date: key, high: item.main.temp_max, low: item.main.temp_min, weatherId: item.weather[0].id, time: item.dt});
          }
        }
      })
      this.listFiveDayForecast = new Array();
      this.fiveDayForecast.forEach(item => {
        this.listFiveDayForecast.push({
          date: item.date,
          high: item.high,
          low: item.low,
          weatherId: item.weatherId,
          time: item.time
        })
      })
    })
  }

  handleChange(event) {
    if (event.target.id == 'Celsius') {
      this.userPreferences.unitOfTemperature = 'C';
      this.updateWeather();
      this.saveUserPerferences();
    } else if (event.target.id == 'Fahrenheit') {
      this.userPreferences.unitOfTemperature = 'F';
      this.updateWeather();
      this.saveUserPerferences();
    } else if (event.target.id == 'LightTheme') {
      this.userPreferences.activeTheme = light;
      this.setLightTheme();
      this.saveUserPerferences();
    } else if (event.target.id == 'DarkTheme') {
      this.userPreferences.activeTheme = dark;
      this.setDarkTheme();
      this.saveUserPerferences();
    }
  }

  getDaytimeWeatherIcon(iconId: number) {    
    return WeatherIconUtil.getIcon(iconId, true);
  }

  getWeatherIcon(iconId: number) {
    return WeatherIconUtil.getIcon(iconId, this.isDaytime(this.currentWeather.dt));
  }

  convertKelvin(k: number) {
     if (this.userPreferences.unitOfTemperature == 'C') {
      return this.convertKelvinToCelsius(k);
     } else {
      return this.convertKelvinToFahrenheit(k);
     }
  }

  convertKelvinToCelsius(k: number) {
    return (k - 273.15).toFixed(0); 
  }

  convertKelvinToFahrenheit(k: number) {
    return ((k - 273.15) * (9 / 5) + 32).toFixed(0);
  }

  getHourStringFromUnixTime(unixTime: number) {
    let date = new Date(unixTime * 1000);
    let amOrpm = date.getHours() < 12 ? 'AM' : 'PM';
    let hours = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
    let timeString = hours + ':' + date.getMinutes() + ' ' + amOrpm;
    return timeString;
  }

  convertUnixToDate(unixTime: number) {
    return new Date(unixTime * 1000);
  }

  // Used to determine which icons to use (either the day or night versions depending on if the sun is up yet or not)
  isDaytime(time: number): boolean {
    let currentTime = time;
    let sunriseTime = this.currentWeather.sys.sunrise;
    let sunsetTime = this.currentWeather.sys.sunset;

    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      return true;
    } else {
      return false;
    }
  }

  isSnowing(weatherCodeId: number): boolean {
    return WeatherIconUtil.isSnowing(weatherCodeId);
  }

  private themeWrapper = document.querySelector('body');

  setLightTheme() {
    light.properties.forEach(cssVar => {
      this.themeWrapper.style.setProperty(cssVar.key, cssVar.value);
    })
  }

  setDarkTheme() {
    dark.properties.forEach(cssVar => {
      this.themeWrapper.style.setProperty(cssVar.key, cssVar.value);
    })
  }

  setTheme(theme: Theme) {
    theme.properties.forEach(cssVar => {
      this.themeWrapper.style.setProperty(cssVar.key, cssVar.value);
    })
  }
}
