import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestcasesComponent } from './testcases.component';

import { TreeModule } from 'angular-tree-component';
import { TestcaseTreeComponent } from '../testcase-tree/testcase-tree.component';

const testcasesRoutes: Routes = [
  {
    path: '',
    component: TestcasesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(testcasesRoutes),
    CommonModule,
    TreeModule
  ],
  declarations: [
    TestcasesComponent,
    TestcaseTreeComponent
  ]
})
export class TestcasesModule { }
