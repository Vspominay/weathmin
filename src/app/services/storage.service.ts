import { GetIconService } from './get-icon.service';
import { Temperature } from './../models/temperature';
import { Daily } from './../models/daily';
import { WeatherState } from '../models/weatherState';
import { Timezone } from '../models/timezone';
import { currentWeather } from '../models/currentWeather';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wind } from '../models/wind';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(private icons: GetIconService) { }

    location = {};

    private currentDay: BehaviorSubject<currentWeather | {}> = new BehaviorSubject({});
    $currentDay:Observable<currentWeather | {}> = this.currentDay.asObservable();

    private weekInformation: BehaviorSubject<Daily[] | any> = new BehaviorSubject([]);
    $weekInformation:Observable< Daily[] | any> = this.weekInformation.asObservable();

    

    setData(weather: currentWeather | any, city: string) {
        
        this.setWeekForecast(weather, city);
        this.setCurrentData(weather, city);
    }

    setCurrentData(weather: currentWeather | any, city: string){
        let {timezone, timezone_offset} = weather;
        let {   
                dt: currentTime, wind_speed: speed, wind_gust: gust, wind_deg: deg,
                temp: degree, humidity, pressure, probability, sunrise, sunset,
            } = weather.current;
        let {main, description, icon} = weather.current.weather[0];

        let image = this.icons.getIcon(main, description);
        
        let time:Timezone = {timezone, timezone_offset, dt: (currentTime * 1000) + ""}
        let wind:Wind = {speed, gust, deg}
        let weathDescription:WeatherState = {main, description, icon}

        const currentDay: currentWeather = {
            city,time,
            degree: Math.round(degree),humidity,
            pressure: Math.round(pressure / 1.333),
            wind,probability,
            sunrise,sunset,
            desc: weathDescription,
            image
        }


        this.currentDay.next(currentDay);
    }

    setWeekForecast(weather: currentWeather | any, city: string){
        let weekArray: Daily[] = [];
        let {timezone, timezone_offset} = weather;
        let time = {timezone, timezone_offset}

        
        
        for (const day of weather.daily) {            
            weekArray.push(this.generateDailyForecast(day, city,time))
        }   
        
        this.weekInformation.next(weekArray);
    }
    
    generateDailyForecast(dayItem: any, city: string, inputTime: any,){
            
        let {dt: currentTime, wind_speed: speed, wind_gust: gust, wind_deg: deg,
            humidity, pressure,pop: probability, rain, clouds, sunrise, sunset
        } = dayItem;
        let {day, min, max, morning, evening, night} = dayItem.temp;// get temperature data

        let wind:Wind = {speed, gust, deg}
        let temp: Temperature = {
            day: Math.round(day),
            min: Math.round(min),
            max: Math.round(max),
            morning: Math.round(morning),
            evening: Math.round(evening),
            night: Math.round(night)
        }
        let time:Timezone = {timezone: inputTime.timezone,timezone_offset: inputTime.timezone_offset, dt: (currentTime * 1000) + ""}

        let {main, description} = dayItem.weather[0];
        let image = this.icons.getIcon(main, description);


        let DayData:Daily = {
            city,
            time,
            humidity,
            pressure: Math.round(pressure / 1.333),
            wind,
            probability,
            rain,
            clouds,
            sunrise,
            sunset,
            temp,
            image,
            desc: description
        };

        return DayData;
    }

    storeLocation(lat: number, lon: number){
        console.log('logcalstorage');
        
        localStorage.setItem('lat', lat + "");
        localStorage.setItem('lon', lon + "");
        this.location = location;
    }

    locationExist():boolean{
        return !!localStorage.getItem('lat') && !!localStorage.getItem('lon');
    }
}
