import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

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
  public loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testcaseService: TestcaseService,
    public themeService: ThemeService,
    private toastNotificationsService: NotificationsService,
    public translate: TranslateService
  ) { }

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

  deleteTestcase(id: string) {
    // TODO delete by object not by ID
    this.loading = true;
    this.testcaseService.deleteTestcase(id).subscribe(
      response => {
        if (response.status === 204) {
          this.toastNotificationsService.success('Testcase ' + this.testcase.title, ' deleted successfully!');

          this.router.navigate(['./testcases']);
        }
      },
      error => console.log(error)
    );
  }

}
