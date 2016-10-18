import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestcaseListComponent } from './components/testcase-list.component';
import { UserListComponent } from './components/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'testcase', component: TestcaseListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }