import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserService } from '../../services/user/user.service';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes),
    CommonModule
  ],
  providers: [UserService],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
