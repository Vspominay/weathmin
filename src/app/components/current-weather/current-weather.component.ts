import { LoaderService } from './../../services/loader.service';
import { CurrentWeather } from './../../models/currentWeather';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})

export class CurrentWeatherComponent implements OnInit {

    @Input()
    currentWeather: CurrentWeather | any =  {};


    constructor(private storage:StorageService) { }

    ngOnInit(): void {
        
        this.storage.$currentDay
            .subscribe((weather: CurrentWeather | any) => {
                if (weather.city) {
                    this.currentWeather = weather;  
                }
            });
    }    
}
