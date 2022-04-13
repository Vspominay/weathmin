import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    isLoaded(): Promise<boolean>{
        return new Promise((res,rej) => {
            if (this.locationIsAllowed$.getValue() && 
                this.applicationReady$.getValue() && 
                this.imageReady$.getValue()) {
                res(true);                
            }
            else{
                res(false);
            }
        })
    }

    locationIsAllowed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    applicationReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    imageReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    

    constructor() { }
}
