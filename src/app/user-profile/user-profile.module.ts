import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule { }
