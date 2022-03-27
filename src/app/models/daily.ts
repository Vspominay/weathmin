import { Temperature } from './temperature';
import { currentWeather } from './currentWeather';


export interface Daily extends currentWeather {
    temp: Temperature,
    clouds: number,
    rain: number, //Precipitation volume
}