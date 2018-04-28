import { Component, OnInit, Input } from '@angular/core';

import { TestCase, Priority } from './test-case';
import { TestSuite } from '../test-suite';

import { TestCaseService } from './test-case.service';

import { ClrDatagridSortOrder } from '@clr/angular';
import { NotificationsService } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {

  selectedTestSuite: TestSuite;
  @Input()
  set selectedTS(testsuite: TestSuite) {
    if (testsuite !== undefined) {
      this.selectedTestSuite = testsuite;
      this.getTestCasesForTestSuite(testsuite._id);
    }
  }
  public selectedTestCases = [];
  public testCases: TestCase[] = [];

  public ascSort = ClrDatagridSortOrder.ASC;

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private testCaseService: TestCaseService,
    protected translateService: TranslateService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  getTestCasesForTestSuite(id: string) {
    this.testCaseService.getTestCasesBySuiteId(id).subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  createTestCase(testcase: TestCase) {
    testcase.testSuiteId = this.selectedTestSuite._id;
    testcase.projectId = this.selectedTestSuite.projectId;
    if (this.testCases.length > 0) {
      testcase.order = this.testCases.length + 1;
    } else {
      testcase.order = 0;
    }

    this.testCaseService.createTestCase(testcase).subscribe(
      response => {
        if (response.status === 201) {
          this.notificationsService.success(
            testcase.title,
            this.translateService.instant('TESTMANAGEMENTPAGE.SUCCESSFULLY_CREATED')
          );
          this.testCases.push(testcase);
        }
      },
      error => console.log(error)
    );
  }

  updateTestCase(testcase: TestCase) {
    testcase.testSuiteId = this.selectedTestSuite._id;
    testcase.projectId = this.selectedTestSuite.projectId;

    this.testCaseService.updateTestCase(testcase, testcase._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            testcase.title,
            this.translateService.instant('TESTMANAGEMENTPAGE.SUCCESSFULLY_UPDATED')
          );

          // update local array of testcases
          const foundIndex = this.testCases.findIndex(mTestcase => mTestcase._id === testcase._id);
          this.testCases[foundIndex] = testcase;

          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => console.log(error)
    );
  }

  forceDelete() {
    this.selectedTestCases.forEach(selectedTestCase => {
      this.testCaseService.deleteTestCase(selectedTestCase._id).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationsService.success(
              selectedTestCase.title,
              this.translateService.instant('TESTMANAGEMENTPAGE.SUCCESSFULLY_DELETED')
            );
            this.testCases = this.testCases.filter(testCases => testCases !== selectedTestCase);
          }
        },
        error => console.log(error)
      );
    });
  }

}
