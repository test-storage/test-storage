import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { TestManagementRoutingModule } from './test-management-routing.module';
import { TestManagementComponent } from './test-management.component';

import { TestCaseService } from './test-cases/test-case.service';
import { TestSuiteService } from './test-suite.service';
import { CreateTestCaseModalComponent } from './create-test-case-modal/create-test-case-modal.component';
import { EditTestCaseModalComponent } from './edit-test-case-modal/edit-test-case-modal.component';
import { DeleteTestCaseModalComponent } from './delete-test-case-modal/delete-test-case-modal.component';
import { TestCasesComponent } from './test-cases/test-cases.component';

@NgModule({
  imports: [
    CommonModule,
    TestManagementRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    TestManagementComponent,
    CreateTestCaseModalComponent,
    EditTestCaseModalComponent,
    DeleteTestCaseModalComponent,
    TestCasesComponent
  ],
  providers: [
    TestSuiteService,
    TestCaseService
  ]
})
export class TestManagementModule { }
