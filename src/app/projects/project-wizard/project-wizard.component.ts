import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.css']
})
export class ProjectWizardComponent implements OnInit {

  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  setOpened(val) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  constructor() { }

  ngOnInit() {
    // TODO delete project data if exists
  }

}
