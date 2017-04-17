import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';

import { TestExecutionsComponent } from './test-executions.component';

const testExecutionsRoutes: Routes = [
  {
    path: '',
    component: TestExecutionsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(testExecutionsRoutes),
    CommonModule
  ],
  declarations: [
    TestExecutionsComponent
  ]
})
export class TestExecutionsModule { }
