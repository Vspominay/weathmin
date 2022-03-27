import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { InfoBarComponent } from './components/info-bar/info-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    CurrentWeatherComponent,
    CelsiusPipe,
    InfoBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
