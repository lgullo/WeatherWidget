import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { CurrentWeatherModel } from './data/CurrentWeatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'weather-widget';

  currentWeather: CurrentWeatherModel;

  sun: string = "../assets/weather-icons/png/003-sun.png";
  rain: string = "../assets/weather-icons/png/002-rain.png";

  constructor(private weatherApiService: WeatherApiService) {
  }

  ngOnInit() {
    this.getTodaysForecast();
  }

  getTodaysForecast() {
    this.weatherApiService.getCurrentForecastByZipCode('26554').subscribe(response => {
      console.log(response);
      this.currentWeather = response;
    })
  }

  getWeatherIcon(icon: string) {
    return this.rain;
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
}
