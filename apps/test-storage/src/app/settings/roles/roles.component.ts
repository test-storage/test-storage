import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { RolesService } from './roles.service';
import { Role } from './role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  selectedRoles = [];
  public roles: Role[] = [];

  constructor(
    private rolesService: RolesService,
    protected translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadRoles(): void {
    this.subscription = this.rolesService.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd(): void {

  }

  onEdit(): void {

  }

  onDelete(): void {

  }
}
