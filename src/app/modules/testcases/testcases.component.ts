import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { Testcase } from '../../models/testcase';
import { TestcaseService } from '../../services/testcase/testcase.service';

import { TestsuitesTreeComponent } from './testsuites-tree/testsuites-tree.component';

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

  testcases: Testcase[];

  constructor(
    private testcaseService: TestcaseService,
    private notificationsService: NotificationsService,
    public themeService: ThemeService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.getTestcases();
  }

  getTestcases() {
    this.testcaseService.getTestcases().subscribe(
      testcases => this.testcases = testcases,
      error => console.log(error)
    );
  }

  deleteTestcase(id: string) {
    // TODO delete by object not by ID
    this.testcaseService.deleteTestcase(id).subscribe(
      response => {
        if (response === 204) {
          console.log('Testcase deleted successfully');
          this.testcases = this.testcases.filter(testcase => testcase._id !== id);
        }
      },
      error => console.log(error)
    );
  }

}
