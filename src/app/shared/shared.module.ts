import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { ValidateEqualDirective } from './validate-equal.directive';
import { AutofocusDirective } from './autofocus.directive';
import { ToastNotificationsService } from './toast-notifications.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsNextModule
  ],
  exports: [
    ClarityModule,
    ClrFormsNextModule,
    ValidateEqualDirective,
    AutofocusDirective
  ],
  declarations: [
    ValidateEqualDirective,
    AutofocusDirective
  ],
  providers: [
    ToastNotificationsService
  ]
})
export class SharedModule { }
