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

    constructor(private bg: GetBackgroundService){}

    prepareRoute(outlet: RouterOutlet){
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }

    ngOnInit(){
        this.bg.getBackground();
        this.bg.$imageBg
            .subscribe(res => {
                if (res.length) {
                    this.bg.backgroundsSet();                   
                }
            })            
    }
}
