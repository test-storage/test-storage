import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
