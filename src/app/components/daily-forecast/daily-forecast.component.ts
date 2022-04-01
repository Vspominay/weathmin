import { GetBackgroundService } from './../../services/get-background.service';
import { StorageService } from 'src/app/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Daily } from 'src/app/models/daily';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

    week: Daily[] = [];

    constructor(
        private storage: StorageService,
        private bg: GetBackgroundService
    ) { }

    ngOnInit(): void {
        this.storage.$weekInformation
            .subscribe((week: any | Daily[]) => {                
                this.week = week;
            })

            this.bg.$imageBg
            .subscribe(res => {
                if (res.length) {
                    this.bg.backgroundsSet();                   
                }
            })
    }

}
