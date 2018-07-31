import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestCase } from '../test-cases/test-case';
import { TestCaseService } from './../test-cases/test-case.service';

@Component({
  selector: 'app-testcase-review',
  templateUrl: './testcase-review.component.html',
  styleUrls: ['./testcase-review.component.css']
})
export class TestcaseReviewComponent implements OnInit {

  private projectId;
  public testCases: TestCase[];

  constructor(
    private testCaseService: TestCaseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
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
