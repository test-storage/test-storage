import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pageTransition } from './../../animations';

import { TestCase } from '../test-cases/test-case';
import { TestCaseService } from './../test-cases/test-case.service';
import { TestcaseStatus } from './testcase-status';
import { ToastNotificationsService } from '../../shared/toast-notifications.service';

@Component({
  selector: 'app-testcase-review',
  templateUrl: './testcase-review.component.html',
  styleUrls: ['./testcase-review.component.css'],
  animations: [pageTransition]
})
export class TestcaseReviewComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  private projectId;
  public testCases: TestCase[];
  public statuses = TestcaseStatus;
  statusesKeys; // enumeration keys

  constructor(
    private testCaseService: TestCaseService,
    private route: ActivatedRoute,
    private notificationsService: ToastNotificationsService) { }

  ngOnInit() {
    this.statusesKeys = Object.keys(this.statuses).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.statuses[key], key: parseInt(key, 10)}));

    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params['id'];
      this.getTestCasesForProject(this.projectId);
    });
  }

  getTestCasesForProject(id: string) {
    this.testCaseService.getTestCasesByProjectId(id, 'CREATED').subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  updateTestCaseStatus(testcase: TestCase) {
    console.log(testcase);
    this.testCaseService.updateTestCase(testcase, testcase._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(testcase.title);

          // update local array of testcases
          const foundIndex = this.testCases.findIndex(mTestcase => mTestcase._id === testcase._id);
          this.testCases[foundIndex] = testcase;
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

}
