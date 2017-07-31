import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { pageTransition } from '../../../animations';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { Testcase } from '../../../models/testcase';
import { TestcaseService } from '../../../services/testcase/testcase.service';



@Component({
  selector: 'app-testcase-create',
  templateUrl: './testcase-create.component.html',
  styleUrls: ['./testcase-create.component.css'],
  providers: [
    TestcaseService
  ],
  animations: [pageTransition()]
})

export class TestcaseCreateComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  public testcase: Testcase = new Testcase();

  constructor(
    private router: Router,
    private testcaseService: TestcaseService,
    public themeService: ThemeService,
    private toastNotificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  createNewTestcase() {
    this.testcaseService.createTestcase(this.testcase).subscribe(
      response => {
        if (response === 201) {
          this.toastNotificationsService.success('Testcase ' + this.testcase.title, 'created successfully!');

          this.router.navigate(['./testcases']);
        }
      },
      error => console.log(error)
    );
  }

}
