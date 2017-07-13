import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from '../../services/user/user.service';
import { UserCreateComponent } from './user-create/user-create.component';


const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    component: UserCreateComponent,
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
    CommonModule,
    FormsModule
  ],
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    UserCreateComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
