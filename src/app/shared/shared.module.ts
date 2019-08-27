import { EmptyStateComponent } from './../empty-state/empty-state.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ValidateEqualDirective } from './validate-equal.directive';
import { AutofocusDirective } from './autofocus.directive';
import { ToastNotificationsService } from './toast-notifications.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule
  ],
  exports: [
    ClarityModule,
    ClrFormsModule,
    ValidateEqualDirective,
    AutofocusDirective,
    EmptyStateComponent
  ],
  declarations: [
    ValidateEqualDirective,
    AutofocusDirective,
    EmptyStateComponent
  ],
  providers: [
    ToastNotificationsService
  ]
})
export class SharedModule { }
