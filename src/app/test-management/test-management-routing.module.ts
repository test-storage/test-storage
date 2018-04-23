import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestManagementComponent } from './test-management.component';

const routes: Routes = [
  { path: '', component: TestManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestManagementRoutingModule { }
