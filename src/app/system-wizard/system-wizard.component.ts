import { Component, OnInit, ViewChild } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-system-wizard',
  templateUrl: './system-wizard.component.html',
  styleUrls: ['./system-wizard.component.css']
})
export class SystemWizardComponent implements OnInit {

  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;

  systemWizard = false;

  constructor() { }

  ngOnInit() {
  }

}
