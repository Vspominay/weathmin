import { GetBackgroundService } from './../../services/get-background.service';
import { Daily } from './../../models/daily';
import { StorageService } from './../../services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {
 
    displayDay: Daily[] | any = [];
    activeTime: Daily | any;

    storageDate: any = {};

    today = new Date(this.storage.transformFormat(Number(new Date())));
    todayDay = this.today.getDate();
    todayMs = this.today.getTime();
    dayByUrl: number = 0;


    constructor(
        private storage: StorageService,
        private route: ActivatedRoute,
        private bg: GetBackgroundService
    ) { }

    ngOnInit(): void {

    this.dayByUrl = this.storage.transformFormat(Number(this.getDayByUrl()));
    this.storage.getHourlyForecastByDay(this.dayByUrl);
    

    this.storage.$ouptuthours
        .subscribe((hours: any) => {            
            if (Object.keys(hours).length) {                
                if (new Date(hours.day).getDate() == new Date(this.todayMs).getDate() || 
                    this.storage.checkNextDay(Number(this.todayMs),hours.day)) {
                
                    this.displayDay = hours.forecast;
                    this.activeTime = this.displayDay[0];                                                      
                }
                else{

                    this.displayDay = hours.forecast;
                    this.activeTime = hours.forecast;                     
                    
                }

            }     
        })

        this.bg.$imageBg
            .subscribe(res => {
                if (res.length) {
                    this.bg.backgroundsSet();                   
                }
            })
    }

    setActiveTime(hour: Daily){
        this.activeTime = hour;
    }
    
    setDay(day: number){        
        this.storage.getHourlyForecastByDay(day);
        this.dayByUrl = day;
    }

    getDayByUrl(){
        return new Date(Number(this.route.snapshot.paramMap.get("time")));        
    }

    checkNextDay(today: number, tomorrow:number){
        let nextDay = !this.storage.checkNextDay(today, tomorrow);
        let sameDay = new Date(this.dayByUrl).getDate() != new Date(this.todayMs).getDate();
        return sameDay && nextDay;
    }
}
