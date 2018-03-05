import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestExecutionsComponent } from './test-executions.component';

const routes: Routes = [
  { path: '', component: TestExecutionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestExecutionsRoutingModule { }
