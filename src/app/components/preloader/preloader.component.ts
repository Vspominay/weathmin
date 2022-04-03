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


    constructor(private loader: LoaderService) { }

    ngOnInit(): void {
        this.loader.locationIsAllowed$
            .subscribe((isBlocked:boolean) => this.isLocationBlocked = !isBlocked);

        this.loader.applicationReady$   
        .subscribe((state: boolean) => this.applicationIsReady = state);
    }

}
