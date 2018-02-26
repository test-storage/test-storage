import { Component, OnInit } from '@angular/core';

import { SimpleNotificationsComponent } from 'angular2-notifications';

@Component({
  selector: 'app-projects-layout',
  templateUrl: './projects-layout.component.html',
  styleUrls: ['./projects-layout.component.css']
})
export class ProjectsLayoutComponent implements OnInit {

  public toastNotificationsOptions = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 30,
    preventDuplicates: true
  };

  constructor() { }

  ngOnInit() {
  }

}
