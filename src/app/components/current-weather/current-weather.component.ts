import { GetIconService } from './../../services/get-icon.service';
import { currentWeather } from './../../models/currentWeather';
import { Timezone } from './../../models/timezone';
import { WeatherState } from './../../models/weatherState';
import { Wind } from './../../models/wind';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, NgModule } from '@angular/core';



@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})

export class CurrentWeatherComponent implements OnInit {

    currentWeather: currentWeather | any =  {};


    constructor(private weatherService:WeatherService,
        private storage:StorageService,
        private icons: GetIconService) { }

    ngOnInit(): void {
        const locationExist = this.storage.locationExist();
        
        if (locationExist) {
            const lat = Number(localStorage.getItem('lat'));
            const lon = Number(localStorage.getItem('lon'));

            this.getWeather(lat, lon);
        }
        else{            
            navigator.geolocation.getCurrentPosition((success) =>{
                const lat  = success.coords.latitude;
                const lon  = success.coords.longitude;
                this.storage.storeLocation(lat, lon);

                this.getWeather(lat, lon);
            },
            (err) => {
                console.warn(err);
            })
        }

        this.storage.$currentDay
            .subscribe((weather: currentWeather | any) => {
                if (weather.city) {
                    this.currentWeather = weather;                    
                }
            });
    }

    
    getWeather(lat: number, lon:number){
        this.weatherService.getCurrentWeather(lat, lon)
                    .subscribe((weather: any) => {
            this.weatherService.getCityByCoordinate(lat, lon)
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
