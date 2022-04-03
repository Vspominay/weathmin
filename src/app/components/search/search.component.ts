import { defaultCities } from './defaultCities';
import { StorageService } from './../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    cities = defaultCities;
    isShowList = false;
    valueInput: string = "";

    constructor(private searchService:SearchService,
        private weatherService:WeatherService,
        private storage:StorageService) { }

    ngOnInit(): void {
        
        this.searchService.searchText.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string):any => this.searchService.searchCities(term))
          ).subscribe((pass: any) => {   
              console.log(pass);
                                    
                this.cities = pass.features;   
                
                console.log(pass.features);
                
        });
    }

    search(term:string){
        this.isShowList = true;
        this.searchService.searchText.next(term);
    }

    setLocation(coordinates: number[]){
        let [lon, lat] = coordinates;

        this.storage.storeLocation(lat, lon);
        this.weatherService.getWeather(lat,lon);
        this.isShowList = false;
        this.valueInput = "";
        this.cities = [];        
    }

    showList(){
        this.isShowList = !this.isShowList;
    }
}
