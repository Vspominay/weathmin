import { LoaderService } from './services/loader.service';
import { GetBackgroundService } from './services/get-background.service';
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

    constructor(){}

    prepareRoute(outlet: RouterOutlet){
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }

    ngOnInit(){
          
    }
}
