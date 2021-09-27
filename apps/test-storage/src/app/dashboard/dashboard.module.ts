import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardComponent, DonutChartComponent]
})
export class DashboardModule { }
