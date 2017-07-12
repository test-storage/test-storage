import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from '../../services/user/user.service';
import { UsersCreateComponent } from './users-create/users-create.component';


const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    component: UsersCreateComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: UserDetailsComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes),
    CommonModule
  ],
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    UsersCreateComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
