import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    CommonModule,
    TranslateModule
  ],
  declarations: [SettingsComponent],
  providers: [TranslateService]
})
export class SettingsModule { }
