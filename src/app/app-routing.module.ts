import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysWeatherComponent } from './todays-weather/todays-weather.component';


const routes: Routes = [
  {path: 'todays-weather', component: TodaysWeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
