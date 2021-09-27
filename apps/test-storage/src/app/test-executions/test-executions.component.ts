import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { pageTransition } from '../animations';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from '../shared/toast-notifications.service';

import { TestrunsService } from './test-executions.service';
import { Testrun } from './testrun';

@Component({
  selector: 'app-test-executions',
  templateUrl: './test-executions.component.html',
  styleUrls: ['./test-executions.component.css'],
  animations: [pageTransition]
})
export class TestExecutionsComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  private subscription!: Subscription;

  createOpened = false;
  editOpened = false;
  deleteOpened = false;

  public projectId!: string;
  public testruns: Testrun[] = [];
  public selectedTestrun!: Testrun;

  public today!: Date;
  public tomorrow!: Date;
  public future!: Date;
  public yesterday!: Date;

  constructor(
    private testrunService: TestrunsService,
    private route: ActivatedRoute,
    private notificationsService: ToastNotificationsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit(): void {

    this.today = new Date();
    this.tomorrow = new Date();
    this.future = new Date();
    this.yesterday = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.yesterday.setDate(this.today.getDate() - 1);
    this.future.setDate(this.today.getDate() + 50);
    this.route.parent?.parent?.params.subscribe(params => {
      this.projectId = params.id;
      this.getTestruns(this.projectId);
    });
    /*
    this.testruns = [
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 30,
        platforms: ['Android'],
        startDate: this.yesterday.toISOString(),
        endDate: this.future.toISOString()
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platforms: ['iOS'],
        startDate: this.yesterday.toISOString(),
        endDate: this.future.toISOString()
      },
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 45,
        platforms: ['Android'],
        startDate: this.today.toISOString(),
        endDate: this.tomorrow.toISOString()
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platforms: ['iOS'],
        startDate: this.today.toISOString(),
        endDate: this.tomorrow.toISOString()
      },
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 30,
        platforms: ['Android'],
        startDate: this.yesterday.toISOString(),
        endDate: this.yesterday.toISOString()
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platforms: ['iOS'],
        startDate: this.yesterday.toISOString(),
        endDate: this.yesterday.toISOString()
      }
    ]; */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getTestruns(projectId: string): void {
    this.subscription = this.testrunService.getTestrunsByProjectId(projectId).subscribe(
      data => this.testruns = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }


  onAdd(): void {
    this.createOpened = true;
  }

  onEdit(testrun: Testrun): void {
    this.editOpened = true;
    this.selectedTestrun = testrun;
  }

  onDelete(testrun: Testrun): void {
    this.deleteOpened = true;
    this.selectedTestrun = testrun;
  }

  createTestrun(testrun: Testrun): void {

    testrun.projectId = this.projectId;

    this.testrunService.createTestrun(testrun).subscribe(
      (response) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(testrun.name);

          this.testruns.push(response.body as Testrun);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateTestrun(testrun: Testrun): void {
    this.testrunService.updateTestrun(testrun, testrun._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(testrun.name);

          // update local array of tesruns
          const foundIndex = this.testruns.findIndex(mTestrun => mTestrun._id === testrun._id);
          this.testruns[foundIndex] = testrun;
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  forceDelete(): void {
    this.testrunService.deleteTestrun(this.selectedTestrun._id as string).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyDeleted(this.selectedTestrun.name);

          this.testruns = this.testruns.filter(testruns => testruns !== this.selectedTestrun);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

}
