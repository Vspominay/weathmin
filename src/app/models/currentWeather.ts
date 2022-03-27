import { Timezone } from './timezone';
import { WeatherState } from './weatherState';
import { Wind } from './wind';

export interface currentWeather {
    city:string,
    time:Timezone,
    degree?:number,
    humidity:number,
    pressure:number,
    wind:Wind,
    sunrise: number,
    sunset:number,
    state_img?:string,
    probability?:number,
    desc?: WeatherState,
    image?: string

}