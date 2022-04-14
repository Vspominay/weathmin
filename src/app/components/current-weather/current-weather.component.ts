import { Subscription } from 'rxjs';
import { LoaderService } from './../../services/loader.service';
import { CurrentWeather } from './../../models/currentWeather';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})

export class CurrentWeatherComponent implements OnInit, OnDestroy {

    @Input()
    currentWeather: CurrentWeather | any =  {};

    currentDaySub!:Subscription;

    constructor(private storage:StorageService) { }

    ngOnInit(): void {
        
        this.currentDaySub = this.storage.$currentDay
            .subscribe((weather: CurrentWeather | any) => {
                if (weather.city) {
                    this.currentWeather = weather;  
                }
            });
    }    

    ngOnDestroy(): void {
        this.currentDaySub.unsubscribe();
    }
    
}
