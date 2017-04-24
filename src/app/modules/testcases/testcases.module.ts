import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestcasesComponent } from './testcases.component';

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
    TestcasesComponent
  ]
})
export class TestcasesModule { }
