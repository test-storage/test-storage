import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClrDatagridSortOrder } from '@clr/angular';

import { TestSuite } from 'src/app/test-management/test-suite';
import { TestCase } from 'src/app/test-management/test-cases/test-case';
import { TestCaseService } from 'src/app/test-management/test-cases/test-case.service';

import { ToastNotificationsService } from '../../shared/toast-notifications.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-test-cases-execution',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {

  selectedTestSuite!: TestSuite;
  @Input()
  set selectedTS(testsuite: TestSuite) {
    if (testsuite !== undefined) {
      this.selectedTestSuite = testsuite;
      this.getTestCasesForTestSuite(testsuite._id as string);
    }
  }
  @Output() save = new EventEmitter();
  public selectedTestCases = [];
  public testCases: TestCase[] = [];

  public ascSort = ClrDatagridSortOrder.ASC;

  constructor(
    private testCaseService: TestCaseService,
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
  }

  getTestCasesForTestSuite(id: string): void {
    this.testCaseService.getTestCasesBySuiteId(id).subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onSave(): void {
    this.save.emit();
  }

}
