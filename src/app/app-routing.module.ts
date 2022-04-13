import { LoadService } from './guards/load.service';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: "weathmin", component: TitlePageComponent, data: {animation: 'isRight'}, canActivate: [LoadService]},
    {path: "daily", component: DailyForecastComponent,data: {animation: 'isLeft'}, canActivate: [LoadService]},
    {path: "hourly/:time", component: HourlyForecastComponent, canActivate: [LoadService]},
    {path: "load", component: PreloaderComponent},
    {path: "",redirectTo: "/load", pathMatch: "full"},
    {path: "**", component: TitlePageComponent, canActivate: [LoadService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
