import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../project';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() projectChange = new EventEmitter<Project>();
  @Input()
  public project: Project;

  constructor() {
    this.project = new Project();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateProject() {
    this.projectChange.emit(this.project);
  }


  ngOnInit() {
  }

}
