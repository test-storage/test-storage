import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { Testcase } from '../../models/testcase';
import { TestcaseService } from '../../services/testcase/testcase.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-testcases',
  templateUrl: './testcases.component.html',
  styleUrls: ['./testcases.component.css'],
  providers: [
    TestcaseService
  ],
  animations: [pageTransition()]
})
export class TestcasesComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  testcases: Testcase[] = [];

  constructor(
    public themeService: ThemeService,
    private testcaseService: TestcaseService) { }

  ngOnInit() {
    this.getTestcases();
  }

  getTestcases() {
    this.testcaseService.getTestcases().subscribe(
      testcases => this.testcases = testcases,
      error => console.log(error)
    );
  }

}
