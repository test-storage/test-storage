import { Component, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { pageTransition } from '../../animations';

import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from '../../shared/toast-notifications.service';

import { TestrunsService } from '../test-executions.service';
import { Testrun } from '../testrun';

@Component({
  selector: 'app-test-executions-details',
  templateUrl: './test-executions-details.component.html',
  styleUrls: ['./test-executions-details.component.css'],
  animations: [pageTransition]
})
export class TestExecutionsDetailsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  testrunId!: string;
  testrun!: Testrun;
  subscription!: Subscription;

  constructor(
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService,
    private route: ActivatedRoute,
    private testrunService: TestrunsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testrunId = params.id;
      this.getTestrun(this.testrunId);
    });
  }

  onEdit(): void {

  }

  getTestrun(id: string): void {
    this.subscription = this.testrunService.getTestrun(id).subscribe(
      data => this.testrun = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
