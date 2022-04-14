import { Subscription } from 'rxjs';
import { Wind } from './../../models/wind';
import { Daily } from './../../models/daily';
import { CurrentWeather } from './../../models/currentWeather';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit, OnDestroy {

    currentWeather: CurrentWeather | any =  {};
    week: Daily[] = [];

    currentDaySub!: Subscription;
    weekInformationSub!: Subscription;
    hourlyInformationSub!: Subscription;

    constructor(
        private storage: StorageService
    ) { }

    ngOnInit(): void {

        this.currentDaySub = this.storage.$currentDay
            .subscribe((weather: CurrentWeather | any) => {
                if (weather.city) {
                    
                    let temp = this.currentWeather.probability;

                    this.currentWeather = weather;
                    this.currentWeather.probability = temp;   
                    this.setWindDirection(weather.wind);                       
                }
        });

        this.weekInformationSub = this.storage.$weekInformation
        .subscribe((weekWeather: any | Daily[]) => {                
            if (weekWeather.length) {                
                this.week = weekWeather.slice(1,4);

                this.hourlyInformationSub = this.storage.$hourlyInformation
                    .subscribe((hours:any) => {
                        if (hours.today) {
                            
                            this.currentWeather.probability =  hours.today[0].probability;                            
                        }
                    })
            }
        })
    
    }

    ngOnDestroy(): void {
        this.currentDaySub.unsubscribe();    
        this.weekInformationSub.unsubscribe();    
        this.hourlyInformationSub.unsubscribe();    
    }


    setWindDirection(wind: Wind){
        
        let directionItem = document.querySelector('.icon-wind-direction') as HTMLElement;
        if (directionItem) {
            let direction = wind.deg - 45;
            directionItem.style.setProperty("transform", `rotate(${direction}deg)` );
            
        }   
    }
}
