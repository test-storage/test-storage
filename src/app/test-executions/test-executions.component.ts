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

  constructor(protected translateService: TranslateService) { }

  ngOnInit() {
    this.testSuites = [
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 30,
        platform: ['Android']
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platform: ['iOS']
      },
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 30,
        platform: ['Android']
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platform: ['iOS']
      },
      {
        title: 'Android Regression Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 30,
        platform: ['Android']
      },
      {
        title: 'iOS Login Feature Suite',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam eos amet sit rem.',
        archieved: false,
        completed: 70,
        platform: ['iOS']
      }
    ];
  }

}
