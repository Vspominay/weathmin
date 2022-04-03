import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {environment as server} from '../server';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    searchText: BehaviorSubject<string> = new BehaviorSubject('');
    
    searchCities(term:string){
        if (!term.trim()) {
            return [];
        }
        return this.http.get(`https://app.geocodeapi.io/api/v1/search?apikey=${server.apiCompleteCity}=${term}&size=5&boundary.country=UA,PL&layers=locality`);
    }

    constructor(private http: HttpClient) { }
}
