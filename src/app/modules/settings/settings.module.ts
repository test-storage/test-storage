import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes),
    CommonModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
