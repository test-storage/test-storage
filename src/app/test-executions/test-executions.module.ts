import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExecutionsRoutingModule } from './test-executions-routing.module';
import { TestExecutionsComponent } from './test-executions.component';
import { TestExecutionsDetailsComponent } from './test-executions-details/test-executions-details.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TestExecutionsRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [TestExecutionsComponent,
    TestExecutionsDetailsComponent]
})
export class TestExecutionsModule { }
