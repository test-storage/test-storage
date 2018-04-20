import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  selected = [];

  public roles = [
    {
      id: '44kijtj55iig',
      name: 'User',
      created: 1523822573
    },
    {
      id: '44kijtj55iig',
      name: 'Admin',
      created: 1523822573
    },
    {
      id: '44kijtj55iig',
      name: 'Read Only',
      created: 1523822573
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onAdd() {

  }

  onEdit() {

  }

  onDelete() {
    // TODO are you sure? via modal
    this.selected.forEach(selectedRole => {
      // TODO delete via service
      this.roles = this.roles.filter(roles => roles !== selectedRole);
      // TODO Notification => successfully deleted
    });
  }
}
