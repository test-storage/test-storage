import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { RolesService } from './roles.service';
import { Role } from './role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  subscription;
  selected = [];
  public roles: Role[];

  constructor(
    private rolesService: RolesService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadRoles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadRoles() {
    this.subscription = this.rolesService.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {

  }

  onEdit() {

  }

  onDelete() {

  }
}
