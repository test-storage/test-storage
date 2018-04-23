import { animate, state, style, transition, trigger } from '@angular/animations';

export const pageTransition =
  trigger('routeAnimation', [
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
  ]);
