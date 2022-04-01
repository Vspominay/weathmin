import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentWeather } from './../models/currentWeather';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBackgroundService {


    private imageBg: BehaviorSubject<string> = new BehaviorSubject( "");
    $imageBg:Observable<any> = this.imageBg.asObservable();

    constructor(private storage:StorageService) { }

    getBackground(){
        const imageSrc = "../assets/image/";

        this.storage.$currentDayStatus
            .subscribe(weather => {
                if (weather.length) {
                    let weathMain:string = weather;
                    
        switch (weathMain.toLowerCase()) {
            
            case "clouds":                        
              this.imageBg.next(`${imageSrc}few_clouds/few_clouds_state1.jpg`)
                break;
            case "clear":
                this.imageBg.next(`${imageSrc}clear_sky/clear_sky_state2.png`)  
                break;
            case "snow":
                this.imageBg.next(`${imageSrc}snow/snow_state1.png`) 
                break;
            case "rain":
                this.imageBg.next(`${imageSrc}rain/rain_state3.png`)
                break;
            case "drizzle":
                this.imageBg.next(`${imageSrc}rain/drizzle_state1.jpg`)  
                break;
            case "thunderstorm":
                this.imageBg.next(`${imageSrc}rain/thunderstorm_state3.jpg`) 
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
};
// setBackGround(path:string){
//     let wrapper = document.querySelector('.wrapper') as HTMLElement;    
//     let blurBg = document.querySelector('.bg') as HTMLElement;

//     if (blurBg) {                
//         blurBg.style.background = `center center/ cover no-repeat url(../../assets/image/few_clouds/few_clouds_state1.jpg), rgba(0, 0, 0, 0.25)`;        
//     }

//     if (wrapper) {
//         wrapper.style.background = `center center/cover no-repeat url(${path}), rgba(0, 0, 0, 0.25)`;
//     }

    
// }   

