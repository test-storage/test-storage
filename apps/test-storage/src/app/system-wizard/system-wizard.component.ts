import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-system-wizard',
  templateUrl: './system-wizard.component.html',
  styleUrls: ['./system-wizard.component.css']
})
export class SystemWizardComponent implements OnInit {

  @ViewChild('wizardxl', { static: true }) wizardExtraLarge!: ClrWizard;

  @Input() opened = false;

  constructor() { }

  ngOnInit(): void {
  }

}
