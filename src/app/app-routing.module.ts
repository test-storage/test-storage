import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: '', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
