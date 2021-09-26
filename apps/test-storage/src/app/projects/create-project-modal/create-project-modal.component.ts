import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../project';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css']
})
export class CreateProjectModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() projectChange = new EventEmitter<Project>();

  public project: Project;

  constructor() {
    this.project = new Project();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createProject() {
    this.projectChange.emit(this.project);
    this.project = new Project();
  }


  ngOnInit() {
  }

}
