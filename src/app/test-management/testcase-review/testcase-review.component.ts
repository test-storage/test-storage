import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pageTransition } from './../../animations';

import { TestCase } from '../test-cases/test-case';
import { TestCaseService } from './../test-cases/test-case.service';
import { TestcaseStatus } from './testcase-status';

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
    private route: ActivatedRoute) { }

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

}
