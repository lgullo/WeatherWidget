import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from "../config";
import { Observable } from 'rxjs';
import { CurrentWeatherModel } from '../data/CurrentWeatherModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getCurrentForecastByZipCode (zipcode: string) {
    return this.http.get<CurrentWeatherModel>(Config.currentWeatherUrl + 'zip=26554,US' + environment.apiKey);
  }
  
}
