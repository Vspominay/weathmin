import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: "weathmin", component: TitlePageComponent},
    {path: "daily", component: DailyForecastComponent},
    {path: "hourly", component: HourlyForecastComponent},
    {path: "",redirectTo: "/weathmin", pathMatch: "full"},
    {path: "**", component: TitlePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
