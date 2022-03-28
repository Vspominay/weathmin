import { Wind } from './../../models/wind';
import { Daily } from './../../models/daily';
import { currentWeather } from './../../models/currentWeather';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

    currentWeather: currentWeather | any =  {};
    week: Daily[] = [];

    constructor(
        private storage: StorageService
    ) { }

    ngOnInit(): void {

        this.storage.$currentDay
        .subscribe((weather: currentWeather | any) => {
            if (weather.city) {
                
                let temp = this.currentWeather.probability;

                this.currentWeather = weather;
                this.currentWeather.probability = temp;   
                this.setWindDirection(weather.wind);                       

            }
        });

        this.storage.$weekInformation
        .subscribe((weekWeather: any | Daily[]) => {                
            if (weekWeather.length) {
                this.week = weekWeather.slice(1,4);
                this.currentWeather.probability =  weekWeather[0].probability * 100;   
            }
        })
    
    }

    setWindDirection(wind: Wind){
        
        let directionItem = document.querySelector('.icon-wind-direction') as HTMLElement;
        if (directionItem) {
            let direction = wind.deg - 45;
            directionItem.style.setProperty("transform", `rotate(${direction}deg)` );
            
        }   
    }
}
