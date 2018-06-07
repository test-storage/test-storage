import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
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

  testrunId: string;
  testrun: Testrun;
  subscription;

  constructor(
    private route: ActivatedRoute,
    private testrunService: TestrunsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.testrunId = params['id'];
      this.getTestrun(this.testrunId);
    });
  }

  onEdit() {

  }

  getTestrun(id: string) {
    this.subscription = this.testrunService.getTestrun(id).subscribe(
      data => this.testrun = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
