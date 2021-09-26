import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ClrWizard } from '@clr/angular';

import { Project } from '../project';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.css']
})
export class ProjectWizardComponent implements OnInit {

  @ViewChild('wizardlg', { static: true }) wizardLarge!: ClrWizard;

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() projectChange = new EventEmitter<Project>();

  project: Project;

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createProject(): void {
    this.projectChange.emit(this.project);
    this.project = new Project();
  }

  constructor() {
    this.project = new Project();
  }

  ngOnInit(): void {
    // TODO delete project data if exists
  }

}
