import { animate, group,query, style, transition, trigger } from "@angular/animations";


export const slider = 
    trigger('routerAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isLeft => *', slideTo('right')),
        transition('isRight => *', slideTo('left')),
    ]);


function slideTo(direction:string): any{
    const optional = {optional: true};
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%',
                opacity: 1
            })
        ], optional),
        query(':enter',[
            style({[direction] : '-100%', opacity: 0})
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({[direction]: '100%', opacity: 0}))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({[direction]: '0%', opacity: 1}))
            ]),
        ])
    ]
}