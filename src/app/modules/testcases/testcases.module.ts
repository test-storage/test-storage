import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { TestcasesComponent } from './testcases.component';
import { TestcaseService } from '../../services/testcase/testcase.service';
import { TestsuiteService } from '../../services/testsuite/testsuite.service';

import { TestsuitesTreeComponent } from './testsuites-tree/testsuites-tree.component';
import { TestcaseDetailsComponent } from './testcase-details/testcase-details.component';
import { TestcaseCreateComponent } from './testcase-create/testcase-create.component';



const testcasesRoutes: Routes = [
  {
    path: '',
    component: TestcasesComponent
  },
  {
    path: 'create',
    component: TestcaseCreateComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: TestcaseDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(testcasesRoutes),
    CommonModule,
    FormsModule,
    TreeModule,
    TranslateModule
  ],
  declarations: [
    TestcasesComponent,
    TestsuitesTreeComponent,
    TestcaseDetailsComponent,
    TestcaseCreateComponent
  ],
  providers: [
    TestcaseService,
    TestsuiteService
  ]
})
export class TestcasesModule { }
