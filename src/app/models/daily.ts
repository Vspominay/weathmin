import { Temperature } from './temperature';
import { CurrentWeather } from './currentWeather';


export interface Daily extends CurrentWeather {
    temp?: Temperature | any,
    clouds: number,
    rain: number, //Precipitation volume
}