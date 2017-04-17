import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LayoutModule } from './modules/layout/layout.module';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', loadChildren: './modules/layout/layout.module#LayoutModule'
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' } // TODO 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }