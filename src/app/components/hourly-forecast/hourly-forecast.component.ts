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

    private today = new Date();
    todayDay = this.today.getDate();
    todayMs = this.today.getTime();
    dayByUrl: number = 0;


    constructor(
        private storage: StorageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

    this.dayByUrl = this.getDayByUrl();
    this.storage.getHourlyForecastByDay(this.dayByUrl);

    this.storage.$ouptuthours
        .subscribe((hours: any) => {

            if (Object.keys(hours).length) {
                
                if (hours.day == this.todayDay || hours.day == this.todayDay + 1) {
                    this.displayDay = hours.forecast;
                    this.activeTime = this.displayDay[0];                                         
                }
                else{
                    this.displayDay = hours.forecast;
                    this.activeTime = hours.forecast;                     
                }

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
        return new Date(Number(this.route.snapshot.paramMap.get("time"))).getDate();        
    }
}
