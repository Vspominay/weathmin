import { LoaderService } from './../../services/loader.service';
import { CurrentWeather } from './../../models/currentWeather';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})

export class CurrentWeatherComponent implements OnInit {

    @Input()
    currentWeather: CurrentWeather | any =  {};


    constructor(private weatherService:WeatherService,
        private storage:StorageService,
        private loader: LoaderService) { }

    ngOnInit(): void {
        const locationExist = this.storage.locationExist();
        
        if (locationExist) {
            const lat = Number(localStorage.getItem('lat'));
            const lon = Number(localStorage.getItem('lon'));

            this.weatherService.getWeather(lat, lon);
            this.loader.locationIsAllowed$.next(true);

        }
        else{            
            navigator.geolocation.getCurrentPosition((success) =>{
                const lat  = success.coords.latitude;
                const lon  = success.coords.longitude;
                this.storage.storeLocation(lat, lon);

                this.weatherService.getWeather(lat, lon);
                this.loader.locationIsAllowed$.next(true);

            },
            (err) => {
                this.loader.locationIsAllowed$.next(false);
            })
        }

        this.storage.$currentDay
            .subscribe((weather: CurrentWeather | any) => {
                if (weather.city) {
                    this.currentWeather = weather;  
                }
            });
    }

    
}
