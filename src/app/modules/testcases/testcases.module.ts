import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestcasesComponent } from './testcases.component';
import { TestcaseService } from '../../services/testcase/testcase.service';

import { TestsuitesTreeComponent } from './testsuites-tree/testsuites-tree.component';
import { TestcaseDetailsComponent } from './testcase-details/testcase-details.component';

const testcasesRoutes: Routes = [
  {
    path: '',
    component: TestcasesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(testcasesRoutes),
    CommonModule
  ],
  declarations: [
    TestcasesComponent,
    TestsuitesTreeComponent,
    TestcaseDetailsComponent
  ],
  providers: [
    TestcaseService
  ]
})
export class TestcasesModule { }
