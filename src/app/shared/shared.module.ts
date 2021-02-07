import { EmptyStateComponent } from './../empty-state/empty-state.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule, ClrFormsModule, ClrTreeViewModule } from '@clr/angular';
import { ValidateEqualDirective } from './validate-equal.directive';
import { AutofocusDirective } from './autofocus.directive';
import { ToastNotificationsService } from './toast-notifications.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    ClrTreeViewModule
  ],
  exports: [
    ClarityModule,
    ClrFormsModule,
    ClrTreeViewModule,
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
