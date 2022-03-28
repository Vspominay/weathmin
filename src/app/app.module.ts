import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    CurrentWeatherComponent,
    InfoBarComponent,
    DailyForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
