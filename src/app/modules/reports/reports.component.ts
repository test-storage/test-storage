import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [pageTransition()]
})
export class ReportsComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
