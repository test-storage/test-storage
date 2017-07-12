import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from '../../services/user/user.service';


const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes),
    CommonModule
  ],
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
