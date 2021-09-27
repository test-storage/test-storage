import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestExecutionsComponent } from './test-executions.component';
import { TestExecutionsDetailsComponent } from './test-executions-details/test-executions-details.component';
import { AddTestcasesComponent } from './add-testcases/add-testcases.component';

const routes: Routes = [
  { path: '', component: TestExecutionsComponent },
  { path: ':id', component: TestExecutionsDetailsComponent },
  { path: ':id/add', component: AddTestcasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestExecutionsRoutingModule { }
