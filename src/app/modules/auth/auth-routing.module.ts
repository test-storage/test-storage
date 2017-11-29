import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsLayoutModule } from '../projects-layout/projects-layout.module';

import { AuthGuard } from '../../services/auth/index';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../projects-layout/projects-layout.module#ProjectsLayoutModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: 'auth', component: LoginComponent },
  // otherwise redirect to 404 page
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
