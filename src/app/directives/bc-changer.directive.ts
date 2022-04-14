import { Subscription } from 'rxjs';
import { LoaderService } from './../services/loader.service';
import { GetBackgroundService } from './../services/get-background.service';
import { style } from '@angular/animations';
import { Directive, ElementRef, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appBcChanger]'
})
export class BcChangerDirective implements OnInit, OnDestroy {

    imageBgSub!: Subscription;

    constructor(private elementRef:ElementRef, 
                private bg: GetBackgroundService,
                private renderer: Renderer2,
                private loader: LoaderService) { }

    ngOnInit(): void {

        this.imageBgSub = this.bg.$imageBg
            .subscribe((bg: string) => {                
                this.renderer.setStyle(this.elementRef.nativeElement,'background-image',`url(${bg})`);
                setTimeout(() => {
                    this.loader.imageReady$.next(true);                                    
                }, 1000);
            });
    }

    ngOnDestroy(): void {
        this.imageBgSub.unsubscribe();
    }
  
}
