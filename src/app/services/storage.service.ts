import { LoaderService } from './loader.service';
import { metricControl } from './metric-control';
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

    constructor(private icons: GetIconService,
        private loader: LoaderService) { }

    location = {};

    $currentDayStatus: BehaviorSubject<string> = new BehaviorSubject("");

    private currentDay: BehaviorSubject<CurrentWeather | {}> = new BehaviorSubject({});
    $currentDay:Observable<CurrentWeather | {}> = this.currentDay.asObservable();

    private weekInformation: BehaviorSubject<Daily[] | any> = new BehaviorSubject([]);
    $weekInformation:Observable< Daily[] | any> = this.weekInformation.asObservable();

    private hourlyInformation: BehaviorSubject<{}> = new BehaviorSubject({});
    $hourlyInformation:Observable< {}> = this.hourlyInformation.asObservable();

    
    private ouptuthours: BehaviorSubject<{}> = new BehaviorSubject({});
    $ouptuthours:Observable< {}> = this.ouptuthours.asObservable();


    setData(weather: CurrentWeather | any, city: string) {
                
        try {
            this.setWeekForecast(weather, city);
            this.setCurrentData(weather, city);
            this.setHourlyData(weather, city);   
            this.loader.applicationReady$.next(true);
            
        } catch (err) {
            console.warn(err);
        }

    }

    setCurrentData(weather: CurrentWeather | any, city: string){
        
        let {timezone, timezone_offset} = weather;
        let {   
                dt: currentTime, wind_speed: speed, wind_gust: gust, wind_deg: deg,
                temp: degree, humidity, pressure, probability, sunrise, sunset,feels_like
            } = weather.current;
        let {main, description, icon} = weather.current.weather[0];

        let image = this.icons.getIcon(main, description);
        
        let time:Timezone = {timezone, timezone_offset, dt: (currentTime * 1000) + ""}
        let wind:Wind = {speed, gust, deg}
        let weathDescription:WeatherState = {main, description, icon}

        const currentDay: CurrentWeather = {
            city,time,
            temp: metricControl.temperature(degree),
            humidity,
            pressure: metricControl.pressure(pressure),
            wind,
            probability: metricControl.probability(probability),
            sunrise,sunset,
            desc: weathDescription,
            image,
            feels_like: metricControl.temperature(feels_like)
        }


        this.currentDay.next(currentDay);
        if (!this.$currentDayStatus.getValue().length) {            
            this.$currentDayStatus.next(weathDescription.main)            
        }
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

        let today = Number(new Date());

        allHours.forEach((element: any) => {
            let day = Number(new Date(element.dt * 1000));

            if (new Date(day).getDate() == new Date(today).getDate()) {
                days.today.push(element);
            }
            else if(this.checkNextDay(today, day)){
                days.tomorrow.push(element);
            }
            else{
                days.other.push(element);
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
        let {day: flday, morn: flmorn, eve: fleve, night: flnight} = dayItem.feels_like;// get temperature data

        let wind:Wind = {speed, gust, deg}

        let temp, feels_like;

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
            
            let fl: Temperature = {
                day: Math.round(flday),
                evening: Math.round(fleve),
                morning: Math.round(flmorn),
                night: Math.round(flnight),
            }
            feels_like = fl;
        }
        else if(option == "hours"){            
            let temperature =  dayItem.temp;
            temp = metricControl.temperature(temperature);
            
            let fl = dayItem.feels_like;
            feels_like = metricControl.temperature(fl);
        }

        let time:Timezone = {timezone: inputTime.timezone,timezone_offset: inputTime.timezone_offset, dt: (currentTime * 1000) + ""}

        let {main, description} = dayItem.weather[0];
        let image = this.icons.getIcon(main, description);
        

        let DayData:Daily = {
            city,
            time,
            humidity,
            pressure: metricControl.pressure(pressure),
            wind,
            probability: metricControl.probability(probability),
            rain,
            clouds,
            sunrise,
            sunset,
            temp,
            image,
            desc: description,
            feels_like
        };

        return DayData;
    }


    storeLocation(lat: number, lon: number){
        
        localStorage.setItem('lat', lat + "");
        localStorage.setItem('lon', lon + "");
        this.location = location;
    }

    locationExist():boolean{
        return !!localStorage.getItem('lat') && !!localStorage.getItem('lon');
    }

    checkNextDay(today: number, tomorrow: number){
 
        var oneday = 1 * 24 * 3600 * 1000; 
        return new Date(today + oneday).getDate() === new Date(tomorrow).getDate()
    }

    getHourlyForecastByDay(day:number){
            
        
        this.hourlyInformation
                .subscribe((hours: any) => {
                    if (Object.keys(hours).length) {
                        
                        let today = Number(new Date(new Date().toDateString()));
                        let currDay = Number(new Date(new Date(day).toDateString()));

                        if (currDay == today) {                            
                            this.ouptuthours.next({day, forecast: hours.today});
                        }
                        else if(this.checkNextDay(today, day)){                                                                                    
                            this.ouptuthours.next({day, forecast: hours.tomorrow});
                        }
                        else{                            
                            this.$weekInformation.subscribe(
                                (week: Daily[]) => {

                                    
                                    for (const dayItem of week) {
                                        let dayDate = new Date(+dayItem.time.dt).getDate();                                        

                                        if (dayDate == new Date(day).getDate()) {                                            
                                            this.ouptuthours.next({day, forecast: dayItem});
                                        }
                                    }                                    
                                }
                            )
                        }
                    }                    
                });
    }

    transformFormat(timeMs: number){
        return new Date(new Date(timeMs).toDateString()).getTime();
    }
}
