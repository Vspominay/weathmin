import { CurrentWeather } from './../../models/currentWeather';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-weather',
  templateUrl: './detail-weather.component.html',
  styleUrls: ['./detail-weather.component.scss']
})
export class DetailWeatherComponent implements OnInit {

    @Input()
    currentWeather: CurrentWeather | any;

    @Input()
    buttonVisibility = false;

    constructor() { }

    ngOnInit(): void {          
    }

    dayExist(obj: any):boolean{
        return obj?.hasOwnProperty("day");
    }

}
