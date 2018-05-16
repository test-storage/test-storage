import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-executions',
  templateUrl: './test-executions.component.html',
  styleUrls: ['./test-executions.component.css'],
  animations: [pageTransition]
})
export class TestExecutionsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public testSuites = [];
  public today: Date;
  public tomorrow: Date;
  public future: Date;
  public yesterday: Date;

  constructor(protected translateService: TranslateService) { }

  ngOnInit() {

    this.today = new Date();
    this.tomorrow = new Date();
    this.future = new Date();
    this.yesterday = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.yesterday.setDate(this.today.getDate() - 1);
    this.future.setDate(this.today.getDate() + 50);

    this.testSuites = [
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
    ];
  }

}
