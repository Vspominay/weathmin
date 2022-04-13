import { LoaderService } from './../services/loader.service';
import { GetBackgroundService } from './../services/get-background.service';
import { style } from '@angular/animations';
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBcChanger]'
})
export class BcChangerDirective implements OnInit {

    constructor(private elementRef:ElementRef, 
                private bg: GetBackgroundService,
                private renderer: Renderer2,
                private loader: LoaderService) { }

    ngOnInit(): void {

        this.bg.$imageBg
            .subscribe((bg: string) => {                
                this.renderer.setStyle(this.elementRef.nativeElement,'background-image',`url(${bg})`);
                setTimeout(() => {
                    this.loader.imageReady$.next(true);                                    
                }, 1000);
            });
    }
  
}
