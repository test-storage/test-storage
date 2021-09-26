import { ActivatedRoute } from '@angular/router';
import { TestCaseService } from './../test-cases/test-case.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testcase-review-notification',
  templateUrl: './testcase-review-notification.component.html',
  styleUrls: ['./testcase-review-notification.component.css']
})
export class TestcaseReviewNotificationComponent implements OnInit {

  private projectId!: string;
  public isReviewAvailable = false;

  constructor(
    private testcaseService: TestCaseService,
    private route: ActivatedRoute) { }

   ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.projectId = params.id;
      this.checkAvailableTestcasesForReview();
    });

   }

  checkAvailableTestcasesForReview(): void {
    this.testcaseService.getTestCasesByProjectId(this.projectId, 'CREATED').subscribe(
      data => data.length > 0 ? this.isReviewAvailable = true : this.isReviewAvailable = false,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
