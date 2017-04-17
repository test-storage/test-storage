import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ProjectsComponent } from './../../components/projects/projects.component';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';

const layoutRoutes: Routes = [
  {
    path: '', children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      }
    ],
    component: LayoutComponent, canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes),
    CommonModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectsComponent
  ]
})
export class LayoutModule { }
