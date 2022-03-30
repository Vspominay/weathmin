import { CurrentWeatherComponent } from './current-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
         CurrentWeatherComponent
    ],
    exports: [
        CurrentWeatherComponent
    ]
})

export class CurrentModule{

}