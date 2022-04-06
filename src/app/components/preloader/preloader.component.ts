import { StorageService } from './../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

    isLocationBlocked: boolean = false;
    applicationIsReady: boolean = false;
    imageIsReady: boolean = false;

    constructor(private loader: LoaderService,
        private weatherService: WeatherService,
        private storage:StorageService) { }

    ngOnInit(): void {
        this.loader.locationIsAllowed$
            .subscribe((isBlocked:boolean) => this.isLocationBlocked = !isBlocked);

        this.loader.applicationReady$   
            .subscribe((state: boolean) => this.applicationIsReady = state);

        this.loader.imageReady$   
            .subscribe((state: boolean) => this.imageIsReady = state);
    }

    startApplication(){
        const lat = 50.469863;
        const lon = 30.431971;
        this.weatherService.getWeather(lat, lon);
        this.storage.storeLocation(lat, lon);
        this.loader.locationIsAllowed$.next(true);
    }

}
