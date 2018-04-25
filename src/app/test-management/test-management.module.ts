import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { TestManagementRoutingModule } from './test-management-routing.module';
import { TestManagementComponent } from './test-management.component';

import { TestCaseService } from './test-case.service';
import { TestSuiteService } from './test-suite.service';

@NgModule({
  imports: [
    CommonModule,
    TestManagementRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [TestManagementComponent],
  providers: [
    TestSuiteService,
    TestCaseService
  ]
})
export class TestManagementModule { }
