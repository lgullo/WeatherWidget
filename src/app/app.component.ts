import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { CurrentWeatherModel } from './data/CurrentWeatherModel';
import WeatherIconUtil from "./config/weather-icon-util";
import { FiveDayWeatherModel } from './data/FiveDayWeatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'weather-widget';

  currentWeather: CurrentWeatherModel;
  fiveDayWeather: FiveDayWeatherModel;

  
 

  constructor(private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.getTodaysForecast();
    this.getFiveDayForecast();
  }

  getTodaysForecast() {
    this.weatherApiService.getCurrentForecastByZipCode('26554').subscribe(response => {
      console.log(response);
      this.currentWeather = response;
    })
  }

  getFiveDayForecast() {
    this.weatherApiService.getFiveDayForecastByZipCode('26554').subscribe(response => {
      console.log(response);
      this.fiveDayWeather = response;
    })
  }

  getWeatherIcon(iconId: number) {
    console.log(iconId);
    
    return WeatherIconUtil.getIcon(iconId, this.isDaytime());
  }

  getCurrentWeatherTemp() {
    return this.convertKelvinToFahrenheit(this.currentWeather.main.temp);
  }

  getCurrentWeatherHighTemp() {
    return this.convertKelvinToFahrenheit(this.currentWeather.main.temp_max);
  }

  getCurrentWeatherLowTemp() {
    return this.convertKelvinToFahrenheit(this.currentWeather.main.temp_min);
  }

  convertKelvinToFahrenheit(k: number) {
    return ((k - 273.15) * (9/5) + 32).toFixed(0);
  }

  isDaytime(): boolean {
    let currentTime = this.currentWeather.dt;
    let sunriseTime = this.currentWeather.sys.sunrise;
    let sunsetTime = this.currentWeather.sys.sunset;

    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      return true;
    } else {
      return false;
    }
  }
}
