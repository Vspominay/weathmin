import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {environment as server} from '../server';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

    constructor(private http: HttpClient,
        private storage: StorageService) { }

    getCurrentWeather(lat: number, lon: number){        
        return this.http.get(`${server.apiUrlWeather}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${server.apiKey}&units=metric`);
    }
    getCoordinatesByLocation(location: string){
        return this.http.get(`${server.apiUrlCoordinates}/direct?q=${location}&appid=${server.apiKey}`);
    }
    getCityByCoordinate(lat: number, lon: number){        
        return this.http.get(`${server.apiUrlCoordinates}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${server.apiKey}`);
    }

    getWeather(lat: number, lon:number){
        this.getCurrentWeather(lat, lon)
                    .subscribe((weather: any) => {
            this.getCityByCoordinate(lat, lon)
                .subscribe((city: any) => {
                    const cityName = city[0].name;
                    if (weather) {
                        this.storage.setData(weather, cityName);
                    }
                    else{
                        console.warn(weather);
                    }
                }
            );
        });
    }

}
