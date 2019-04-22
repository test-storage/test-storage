import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';
import { DonutChartOptions } from '../donut-chart/chart-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public options: Partial<DonutChartOptions> = {
    backgroundColor: '#d9d9d9',
    fillColor: '#5ea41c',
    textColor: '#EAEAEA',
    subTextColor: '#333333'
  };

  constructor() { }

  ngOnInit() {
  }

}
