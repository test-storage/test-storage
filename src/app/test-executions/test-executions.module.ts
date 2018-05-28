import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExecutionsRoutingModule } from './test-executions-routing.module';
import { TestExecutionsComponent } from './test-executions.component';
import { TestExecutionsDetailsComponent } from './test-executions-details/test-executions-details.component';
import { TestrunsService } from './test-executions.service';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { CreateTestRunModalComponent } from './create-test-run-modal/create-test-run-modal.component';
import { EditTestRunModalComponent } from './edit-test-run-modal/edit-test-run-modal.component';
import { DeleteTestRunModalComponent } from './delete-test-run-modal/delete-test-run-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TestExecutionsRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [TestrunsService],
  declarations: [
    TestExecutionsComponent,
    TestExecutionsDetailsComponent,
    CreateTestRunModalComponent,
    EditTestRunModalComponent,
    DeleteTestRunModalComponent
  ]
})
export class TestExecutionsModule { }
