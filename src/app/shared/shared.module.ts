import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  exports: [
    ClarityModule
  ],
  declarations: []
})
export class SharedModule { }
