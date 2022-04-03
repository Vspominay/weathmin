import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentWeather } from './../models/currentWeather';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBackgroundService {


    private imageBg: BehaviorSubject<string> = new BehaviorSubject( "");
    $imageBg:Observable<string> = this.imageBg.asObservable();

    constructor(private storage:StorageService) { }

    getBackground(){
        const imageSrc = "../assets/image/";

        this.storage.$currentDayStatus
            .subscribe(weather => {
                if (weather.length) {
                    let weathMain:string = weather;
                    
        let state = this.getRandomState(1,3);

        switch (weathMain.toLowerCase()) {
            case "clouds":
              this.imageBg.next(`${imageSrc}few_clouds/few_clouds_state${state}.jpg`)
                break;
            case "clear":
                this.imageBg.next(`${imageSrc}clear_sky/clear_sky_state${state}.jpg`)  
                break;
            case "snow":
                this.imageBg.next(`${imageSrc}snow/snow_state1.jpg`) 
                break;
            case "rain":
                this.imageBg.next(`${imageSrc}rain/rain_state${state}.jpg`)
                break;
            case "drizzle":
                this.imageBg.next(`${imageSrc}rain/drizzle_state1.jpg`)  
                break;
            case "thunderstorm":
                this.imageBg.next(`${imageSrc}thunderstorm/thunderstorm_state${state}.jpg`) 
                break;
            case "atmosphere":
                this.imageBg.next(`${imageSrc}mist/mist_state3.jpg`) 
                break;
            default:
                this.imageBg.next(`${imageSrc}rain/drizzle_state1.jpg`) 
                break;
                }
            }
        })
    }

    backgroundsSet(){
        let wrapper = document.querySelector(`.wrapper`) as HTMLElement;
        let path = this.imageBg.getValue();

        if (wrapper) {
            wrapper.style.background = `
            center center/cover no-repeat url(${path}), rgba(0, 0, 0, 0.25)
            `;
        }
    }

    getRandomState(min:number, max:number){
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
};


