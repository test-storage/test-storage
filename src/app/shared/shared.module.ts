import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { ValidateEqualDirective } from '../settings/users/validate-equal.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  exports: [
    ClarityModule,
    ValidateEqualDirective,
    AutofocusDirective
  ],
  declarations: [
    ValidateEqualDirective,
    AutofocusDirective
  ]
})
export class SharedModule { }
