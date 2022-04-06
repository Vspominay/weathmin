import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    locationIsAllowed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    applicationReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    imageReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    

    constructor() { }
}
