import { LoaderService } from './../services/loader.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService implements CanActivate{

    constructor(private loader: LoaderService,
                private router: Router) { }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        
            return this.loader.isLoaded()
            .then((ready: boolean) => {                
                if (ready) {
                    return true;     
                }
                else{                    
                    this.router.navigate(['/']);
                    return false;
                }
        })      
    }
}
