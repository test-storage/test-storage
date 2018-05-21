import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../animations';

import { TranslateService } from '@ngx-translate/core';

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

  private subscription;

  public testruns: Testrun[] = [];
  public today: Date;
  public tomorrow: Date;
  public future: Date;
  public yesterday: Date;

  constructor(
    private testrunService: TestrunsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {

    this.today = new Date();
    this.tomorrow = new Date();
    this.future = new Date();
    this.yesterday = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.yesterday.setDate(this.today.getDate() - 1);
    this.future.setDate(this.today.getDate() + 50);

    this.getTestruns();
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  getTestruns() {
    this.subscription = this.testrunService.getTestruns().subscribe(
      data => this.testruns = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
