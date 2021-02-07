import { Component, OnInit, Input } from '@angular/core';

import { DonutChartOptions } from './chart-options';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent {

  mOptions: Partial<DonutChartOptions> = {
    backgroundColor: '#d9d9d9',
    fillColor: '#5ea41c',
    textColor: '#333333',
    subTextColor: '#333333'
  };

  @Input()
  set options(options: DonutChartOptions) {
    this.mOptions = options;
  }

  @Input()
  text!: string;

  @Input()
  subText!: string;


  mPercents!: string;

  @Input()
  set percents(percents: number) {
    this.mPercents = this.calculatePercents(percents);
  }

  calculatePercents(percents: number): string {
    return `${ percents } ${ 100 - percents }`;
  }


  constructor() { }
}
