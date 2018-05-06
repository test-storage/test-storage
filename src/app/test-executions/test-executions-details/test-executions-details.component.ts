import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-executions-details',
  templateUrl: './test-executions-details.component.html',
  styleUrls: ['./test-executions-details.component.css'],
  animations: [pageTransition]
})
export class TestExecutionsDetailsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
