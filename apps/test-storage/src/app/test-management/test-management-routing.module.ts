import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestManagementComponent } from './test-management.component';
import { TestcaseReviewComponent } from './testcase-review/testcase-review.component';

const routes: Routes = [
  { path: '', component: TestManagementComponent },
  { path: 'review', component: TestcaseReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestManagementRoutingModule { }
