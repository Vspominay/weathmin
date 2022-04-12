import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: false,
    apiKey : "3998614a1d42fcc8fa84b1af4c388f96",
    apiUrlWeather : "https://api.openweathermap.org/data/2.5/",
    apiUrlCoordinates : "https://api.openweathermap.org/geo/1.0",
    apiCompleteCity: "a4deba40-b276-11ec-b4e8-7d49af492f69&text",
}

export const weatherUrl = "";

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};