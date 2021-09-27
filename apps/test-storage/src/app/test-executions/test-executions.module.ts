import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { TestExecutionsRoutingModule } from './test-executions-routing.module';

import { TestrunsService } from './test-executions.service';
import { TestSuiteService } from './../test-management/test-suite.service';

import { TestExecutionsComponent } from './test-executions.component';
import { TestExecutionsDetailsComponent } from './test-executions-details/test-executions-details.component';

import { CreateTestRunModalComponent } from './create-test-run-modal/create-test-run-modal.component';
import { EditTestRunModalComponent } from './edit-test-run-modal/edit-test-run-modal.component';
import { DeleteTestRunModalComponent } from './delete-test-run-modal/delete-test-run-modal.component';

import { AddTestcasesComponent } from './add-testcases/add-testcases.component';
import { TestCasesComponent } from './test-cases/test-cases.component';
import { TestCaseService } from '../test-management/test-cases/test-case.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TestExecutionsRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [TestrunsService, TestSuiteService, TestCaseService],
  declarations: [
    TestExecutionsComponent,
    TestExecutionsDetailsComponent,
    CreateTestRunModalComponent,
    EditTestRunModalComponent,
    DeleteTestRunModalComponent,
    AddTestcasesComponent,
    TestCasesComponent
  ]
})
export class TestExecutionsModule { }
