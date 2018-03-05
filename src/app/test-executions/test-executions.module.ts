import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExecutionsRoutingModule } from './test-executions-routing.module';
import { TestExecutionsComponent } from './test-executions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TestExecutionsRoutingModule,
    SharedModule
  ],
  declarations: [TestExecutionsComponent]
})
export class TestExecutionsModule { }
