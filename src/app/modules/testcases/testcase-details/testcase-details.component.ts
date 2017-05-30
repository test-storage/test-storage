import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Testcase } from '../../../models/testcase';
import { TestcaseService } from '../../../services/testcase/testcase.service';

@Component({
  selector: 'app-testcase-details',
  templateUrl: './testcase-details.component.html',
  styleUrls: ['./testcase-details.component.css']
})
export class TestcaseDetailsComponent implements OnInit, OnDestroy {

  id: string;
  private subscription;
  testcase: Testcase;

  constructor(private route: ActivatedRoute, private testcaseService: TestcaseService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getTestcase(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTestcase(id: string) {
    /* this.subscription = */
    this.testcaseService.getTestcase(id).subscribe(
      data => this.testcase = data,
      error => console.log(error)
    );
  }

  createNewTestcase() {
    this.testcaseService.createTestcase(this.testcase).subscribe(
      data => console.log('data: ' + JSON.stringify(data)), // this.project = data,
      error => console.log(error)
    );
  }

}
