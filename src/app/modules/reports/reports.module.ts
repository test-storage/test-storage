import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';

import { ReportsComponent } from './reports.component';

const reportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(reportsRoutes),
    CommonModule
  ],
  declarations: [
    ReportsComponent
  ]
})
export class ReportsModule { }
