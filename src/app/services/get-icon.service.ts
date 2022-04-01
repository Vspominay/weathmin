import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIconService {

    constructor() { }

    getIcon(weatherMain: string = "clouds", type: string = "few clouds"): string{

        const imageSrc = "../../../assets/image/";
        switch (weatherMain.toLowerCase()) {
            case "clouds":
                switch (type.toLowerCase()) {
                    case "few clouds": return `${imageSrc}few_clouds/icons/few_clouds_i4.png`;
                    case "broken clouds": return `${imageSrc}few_clouds/icons/few_clouds_i1.png`;                                    
                    case "overcast clouds": return `${imageSrc}few_clouds/icons/few_clouds_i1.png`;                                    
                    default: return `${imageSrc}few_clouds/icons/few_clouds_i2.png`;                
                }
        
            case "clear":
                return `${imageSrc}clear_sky/icons/clear_sky_i1.png`;
        
            case "snow":
                switch (type.toLowerCase()) {
                    case "light snow": return `${imageSrc}snow/icons/snow_i3.png`;
                    case "snow": return `${imageSrc}snow/icons/snow_i1.png`;
                    case "heavy snow": return `${imageSrc}snow/icons/snow_i8.png`;
                    case "sleet": return `${imageSrc}snow/icons/snow_i1.png`;
                    case "light shower sleet": return `${imageSrc}snow/icons/snow_i1.png`;
                    case "rain and snow": return `${imageSrc}snow/icons/snow_i7.png`;
                    default: return `${imageSrc}snow/icons/snow_i8.png`;
                }
            case "rain":
                switch (type.toLowerCase()) {
                    case "light rain": return `${imageSrc}rain/icons/rain_i4.png`;
                    case "moderate rain": return `${imageSrc}rain/icons/rain_i5.png`;
                    case "heavy intensity rain": return `${imageSrc}rain/icons/rain_i12.png`;
                    case "very heavy rain": return `${imageSrc}rain/icons/rain_i13.png`;
                    case "extreme rain": return `${imageSrc}rain/icons/rain_i13.png`;
                    default: return `${imageSrc}rain/icons/rain_i3.png`;
                }
            case "drizzle":
                return `${imageSrc}rain/icons/rain_i3.png`;
            case "thunderstorm":
                switch (type.toLowerCase()) {
                    case "thunderstorm with light rain": return `${imageSrc}thunderstorm/icons/thunderstorm_i4.png`;
                    case "thunderstorm with heavy rain": return `${imageSrc}thunderstorm/icons/thunderstorm_i5.png`;
                    case "light thunderstorm": return `${imageSrc}thunderstorm/icons/thunderstorm_i2.png`;
                    default: return `${imageSrc}thunderstorm/icons/thunderstorm_i1.png`;
                }        

            default: return `${imageSrc}mist/icons/mist_i1.png`;                
        }
        
    };
}
