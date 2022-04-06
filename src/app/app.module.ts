import { CurrentModule } from './components/current-weather/current.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { DetailWeatherComponent } from './components/detail-weather/detail-weather.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    InfoBarComponent,
    DailyForecastComponent,
    HourlyForecastComponent,
    DetailWeatherComponent,
    SearchComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrentModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
