import { Component, ViewChild, Input } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-system-wizard',
  templateUrl: './system-wizard.component.html',
  styleUrls: ['./system-wizard.component.css']
})
export class SystemWizardComponent {

  @ViewChild('wizardxl', { static: true }) wizardExtraLarge!: ClrWizard;

  @Input() opened = false;

}
