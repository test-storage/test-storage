import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { TestManagementRoutingModule } from './test-management-routing.module';
import { TestManagementComponent } from './test-management.component';

@NgModule({
  imports: [
    CommonModule,
    TestManagementRoutingModule,
    SharedModule
  ],
  declarations: [TestManagementComponent]
})
export class TestManagementModule { }
