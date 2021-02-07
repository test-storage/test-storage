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

  selectedTestSuite!: TestSuite;
  @Input()
  set selectedTS(testsuite: TestSuite) {
    if (testsuite !== undefined) {
      this.selectedTestSuite = testsuite;
      this.getTestCasesForTestSuite(testsuite._id as string);
    }
  }
  public selectedTestCases: TestCase[] = [];
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

  ngOnInit(): void {
  }

  getTestCasesForTestSuite(id: string): void {
    this.testCaseService.getTestCasesBySuiteId(id).subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd(): void {
    this.createOpened = true;
  }

  onEdit(): void {
    this.editOpened = true;
  }

  onDelete(): void {
    this.deleteOpened = true;
  }

  onCopy(): void {
    const testcase: TestCase = Object.assign({}, this.selectedTestCases[0]);
    testcase.title = `${this.selectedTestCases[0].title}(1)`;
    delete testcase.createdBy;
    delete testcase.updatedBy;
    delete testcase.created;
    delete testcase.updated;
    delete testcase._id;
    this.testCaseService.createTestCase(testcase).subscribe(
      (response) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(testcase.title);

          this.testCases.push(response.body as TestCase);
          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  createTestCase(testcase: TestCase): void {
    testcase.testSuiteId = this.selectedTestSuite._id as string;
    testcase.projectId = this.selectedTestSuite.projectId;
    if (this.testCases.length > 0) {
      testcase.order = this.testCases.length + 1;
    } else {
      testcase.order = 0;
    }

    this.testCaseService.createTestCase(testcase).subscribe(
      (response) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(testcase.title);

          this.testCases.push(response.body as TestCase);
          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateTestCase(testcase: TestCase): void {
    testcase.testSuiteId = this.selectedTestSuite._id as string;
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
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  forceDelete($event: any): void {
    this.selectedTestCases.forEach(selectedTestCase => {
      this.testCaseService.deleteTestCase(selectedTestCase._id as string).subscribe(
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
          } else if (error.error.statusCode === 403) {
            this.notificationsService.forbidden();
          } else {
            this.notificationsService.commonError();
          }
        }
      );
    });
  }

}
