import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { ValidateEqualDirective } from '../settings/users/validate-equal.directive';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  exports: [
    ClarityModule,
    ValidateEqualDirective
  ],
  declarations: [
    ValidateEqualDirective
  ]
})
export class SharedModule { }
