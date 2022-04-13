import { Router } from '@angular/router';
import { GetBackgroundService } from './../../services/get-background.service';
import { StorageService } from './../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { LoaderService } from './../../services/loader.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit, AfterContentInit {

    isLocationBlocked: boolean = false;
    applicationIsReady: boolean = false;
    imageIsReady: boolean = false;

    constructor(private loader: LoaderService,
        private weatherService: WeatherService,
        private storage:StorageService,
        private bg:GetBackgroundService,
        private router:Router) { }

    ngOnInit(): void {
        const locationExist = this.storage.locationExist();
                    
    if (locationExist) {
        const lat = Number(localStorage.getItem('lat'));
        const lon = Number(localStorage.getItem('lon'));

        this.weatherService.getWeather(lat, lon);
        this.loader.locationIsAllowed$.next(true);

    }
    else{            
        navigator.geolocation.getCurrentPosition((success) =>{
            const lat  = success.coords.latitude;
            const lon  = success.coords.longitude;
            this.storage.storeLocation(lat, lon);

            this.weatherService.getWeather(lat, lon);
            this.loader.locationIsAllowed$.next(true);

        },
        (err) => {
            this.loader.locationIsAllowed$.next(false);
        })
    }

    this.bg.getBackground();
    }

    ngAfterContentInit(): void {
        
    this.loader.locationIsAllowed$
        .subscribe((isBlocked:boolean) => {
            this.isLocationBlocked = !isBlocked;
            this.checkReady();
        });

    this.loader.applicationReady$   
        .subscribe((state: boolean) => {
            this.applicationIsReady = state;
            this.checkReady();
        });

    this.loader.imageReady$
        .subscribe((state: boolean) => {
            this.imageIsReady = state;
            this.checkReady();
        });
    }

    startApplication(){
        const lat = 50.469863;
        const lon = 30.431971;
        this.weatherService.getWeather(lat, lon);
        this.storage.storeLocation(lat, lon);
        this.loader.locationIsAllowed$.next(true);
        this.loader.isLoaded();
        this.router.navigate(['/weathmin']);
    }

    checkReady(){

        if(this.applicationIsReady && this.imageIsReady){            
            this.loader.isLoaded();
            this.router.navigate(['/weathmin']);

        }
    }
}
