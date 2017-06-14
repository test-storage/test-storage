import { trigger, transition, animate, style, state } from '@angular/animations';

export function pageTransition() {
    return trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateY(0)'
            })
        ),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(5%)'
            }),
            animate('0.6s ease-in-out')
        ])
    ])
}

export function fadeInAnimation() {
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ])
}


