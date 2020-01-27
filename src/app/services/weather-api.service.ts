import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from "../config/config";
import { Observable, zip } from 'rxjs';
import { CurrentWeatherModel } from '../data/CurrentWeatherModel';
import {environment} from "../../environments/environment";
import { FiveDayWeatherModel } from '../data/FiveDayWeatherModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getCurrentForecastByZipCode (zipcode: string) {
    return this.http.get<CurrentWeatherModel>(Config.currentWeatherUrl + 'zip=' + zipcode + ',US' + environment.apiKey);
  }
  
  getFiveDayForecastByZipCode (zipcode: string) {
    return this.http.get<FiveDayWeatherModel>(Config.fiveDayWeatherUrl + 'zip=' + zipcode + ',US' + environment.apiKey);
  }
}
