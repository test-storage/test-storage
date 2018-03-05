import { Component, OnInit, ViewChild } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.css']
})
export class ProjectWizardComponent implements OnInit {

  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;

  projectWizard: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
