import { GetIconService } from './get-icon.service';
import { Temperature } from './../models/temperature';
import { Daily } from './../models/daily';
import { WeatherState } from '../models/weatherState';
import { Timezone } from '../models/timezone';
import { CurrentWeather } from '../models/currentWeather';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wind } from '../models/wind';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(private icons: GetIconService) { }

    location = {};

    private currentDay: BehaviorSubject<CurrentWeather | {}> = new BehaviorSubject({});
    $currentDay:Observable<CurrentWeather | {}> = this.currentDay.asObservable();

    private weekInformation: BehaviorSubject<Daily[] | any> = new BehaviorSubject([]);
    $weekInformation:Observable< Daily[] | any> = this.weekInformation.asObservable();

    private hourlyInformation: BehaviorSubject<{}> = new BehaviorSubject({});
    $hourlyInformation:Observable< {}> = this.hourlyInformation.asObservable();

    
    private ouptuthours: BehaviorSubject<{}> = new BehaviorSubject({});
    $ouptuthours:Observable< {}> = this.ouptuthours.asObservable();


    setData(weather: CurrentWeather | any, city: string) {
        
        this.setWeekForecast(weather, city);
        this.setCurrentData(weather, city);
        this.setHourlyData(weather, city);    
    }

    setCurrentData(weather: CurrentWeather | any, city: string){
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

        const currentDay: CurrentWeather = {
            city,time,
            temp: Math.round(degree),humidity,
            pressure: Math.round(pressure / 1.333),
            wind,probability,
            sunrise,sunset,
            desc: weathDescription,
            image
        }


        this.currentDay.next(currentDay);
    }

    setHourlyData(weather: CurrentWeather | any, city: string){
        let days = {
            today: [] as any,
            tomorrow: [] as any,
            other: [] as any,
        }

        let allHours = weather.hourly;
        
        if (Object.keys(allHours).length < 48) {
            throw new Error("not enough hours");
        }

        let today = new Date().getDate();

        allHours.forEach((element: any) => {
            let day = new Date(element.dt * 1000).getDate();

            switch (day) {
                case  today:
                    days.today.push(element);
                    break;
                case  today + 1:
                    days.tomorrow.push(element);
                    break;
                default:
                    days.other.push(element);
                    break;
            } 
        });
                
        let outputHours = {
            today: [] as Daily[],
            tomorrow: [] as Daily[],
            other: [] as Daily[],
        }

        let {timezone, timezone_offset} = weather;
        let time = {timezone, timezone_offset}


        outputHours.today = this.prepareHours(days.today, city, time);
        outputHours.tomorrow = this.prepareHours(days.tomorrow, city, time);
        outputHours.other = this.prepareHours(days.other, city, time);        
        
        this.hourlyInformation.next(outputHours);
    }

    prepareHours(day: any[], city: string, time: any){
        let result:Daily[] = []; 

        if (day.length) {
            for (const hour of day) {
                result.push(this.generateDailyForecast(hour, city,time, "hours"))
            }
        }
        return result;
    }

    setWeekForecast(weather: CurrentWeather | any, city: string){
        let weekArray: Daily[] = [];
        let {timezone, timezone_offset} = weather;
        let time = {timezone, timezone_offset}

        
        
        for (const day of weather.daily) {            
            weekArray.push(this.generateDailyForecast(day, city,time))
        }   
        
        this.weekInformation.next(weekArray);
    }
    
    generateDailyForecast(dayItem: any, city: string, inputTime: any, option = "week"){
            
        let {dt: currentTime, wind_speed: speed, wind_gust: gust, wind_deg: deg,
            humidity, pressure,pop: probability, rain, clouds, sunrise, sunset
        } = dayItem;
                
        let {day, min, max, morn: morning, eve: evening, night} = dayItem.temp;// get temperature data

        let wind:Wind = {speed, gust, deg}

        let temp;

        if (option == "week") {
            let temperature: Temperature = {
                day: Math.round(day),
                min: Math.round(min),
                max: Math.round(max),
                morning: Math.round(morning),
                evening: Math.round(evening),
                night: Math.round(night)
            }
            temp = temperature;            
        }
        else if(option == "hours"){            
            let temperature =  dayItem.temp;
            temp = Math.round(temperature);
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

    getHourlyForecastByDay(day:number){
        
        console.log(day);
        

        this.hourlyInformation
                .subscribe((hours: any) => {
                    if (Object.keys(hours).length) {
                        let today = new Date().getDate();
                        if (day == today) {
                            this.ouptuthours.next({day, forecast: hours.today});
                        }
                        else if(day == today + 1){
                            this.ouptuthours.next({day, forecast: hours.tomorrow});
                        }
                        else{
                            this.$weekInformation.subscribe(
                                (week: Daily[]) => {
                                    for (const dayItem of week) {
                                        
                                        let dayDate = new Date(+dayItem.time.dt).getDate();
 
                                        if (dayDate == day) {
                                            this.ouptuthours.next({day, forecast: dayItem});
                                        }
                                    }                                    
                                }
                            )
                        }
                    }                    
                });
        

    }
}
