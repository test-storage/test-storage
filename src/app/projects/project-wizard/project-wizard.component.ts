import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.css']
})
export class ProjectWizardComponent implements OnInit {

  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;

  @Input() opened = false;

  constructor() { }

  ngOnInit() {
    // TODO delete project data if exists
  }

}
