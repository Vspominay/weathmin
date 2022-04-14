import { Subscription } from 'rxjs';
import { GetBackgroundService } from './../../services/get-background.service';
import { StorageService } from 'src/app/services/storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Daily } from 'src/app/models/daily';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit, OnDestroy {

    week: Daily[] = [];
    weekInformationSub!: Subscription;

    constructor(
        private storage: StorageService,
        private bg: GetBackgroundService
    ) { }

    ngOnInit(): void {
        this.weekInformationSub = this.storage.$weekInformation
            .subscribe((week: any | Daily[]) => {                       
                this.week = week;
            })
    }

    ngOnDestroy(): void {
        this.weekInformationSub.unsubscribe();
    }

}
