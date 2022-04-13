import { LoaderService } from './services/loader.service';
import { slider } from './animations/routing-animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
      slider
  ]
})
export class AppComponent {

    applicationIsReady: boolean = false;
    constructor(private loader:LoaderService){}

    prepareRoute(outlet: RouterOutlet){
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }

    ngOnInit(){
        this.loader.applicationReady$
            .subscribe((state: boolean) => {                
                this.applicationIsReady = state})
    }
}
