import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { TestCase } from './test-case';
import { TestSuite } from '../test-suite';

import { TestCaseService } from './test-case.service';

import { ClrDatagridSortOrder } from '@clr/angular';
import { ToastNotificationsService } from '../../shared/toast-notifications.service';
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
    private notificationsService: ToastNotificationsService
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
      (response: HttpResponse<TestCase>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(testcase.title);

          this.testCases.push(response.body);
          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateTestCase(testcase: TestCase) {
    testcase.testSuiteId = this.selectedTestSuite._id;
    testcase.projectId = this.selectedTestSuite.projectId;

    this.testCaseService.updateTestCase(testcase, testcase._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(testcase.title);

          // update local array of testcases
          const foundIndex = this.testCases.findIndex(mTestcase => mTestcase._id === testcase._id);
          this.testCases[foundIndex] = testcase;

          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  forceDelete($event) {
    this.selectedTestCases.forEach(selectedTestCase => {
      this.testCaseService.deleteTestCase(selectedTestCase._id).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationsService.successfullyDeleted(selectedTestCase.title);

            this.testCases = this.testCases.filter(testCases => testCases !== selectedTestCase);
            // remove selection
            this.selectedTestCases = [];
          }
        },
        error => {
          console.log(error);
          if (error.error.statusCode === 400) {
            this.notificationsService.badRequest();
          }
          if (error.error.statusCode === 403) {
            this.notificationsService.forbidden();
          } else {
            this.notificationsService.commonError();
          }
        }
      );
    });
  }

}
