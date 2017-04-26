import { Component, OnInit } from '@angular/core';

import { Testcase } from '../../models/testcase';
import { TestcaseService } from '../../services/testcase/testcase.service';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css'],
  providers: [
    TestcaseService
  ]
})
export class TestcasesComponent implements OnInit {

  testcases: Testcase[] = [];

  constructor(private testcaseService: TestcaseService) { }

  ngOnInit() {
    this.getTestcases();
  }

  getTestcases() {
    this.testcaseService.getTestcases().subscribe(
      data => this.testcases = data,
      error => console.log(error)
    );
  }

}
