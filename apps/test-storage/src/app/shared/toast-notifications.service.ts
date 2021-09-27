import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastNotificationsService {

  constructor(
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) { }

  successfullyCreated(name: string) {
    this.notificationsService.success(
      name,
      this.translateService.instant('COMMON.SUCCESSFULLY_CREATED')
    );
  }
  successfullyUpdated(name: string) {
    this.notificationsService.success(
      name,
      this.translateService.instant('COMMON.SUCCESSFULLY_UPDATED')
    );
  }

  successfullyDeleted(name: string) {
    this.notificationsService.success(
      name,
      this.translateService.instant('COMMON.SUCCESSFULLY_DELETED')
    );
  }

  badRequest() {
    this.notificationsService.error(
      this.translateService.instant('COMMON.ERROR_OCCURED'),
      this.translateService.instant('COMMON.VALIDATION_FAILED')
    );
  }

  forbidden() {
    this.notificationsService.warn(
      this.translateService.instant('COMMON.FORBIDDEN'),
      this.translateService.instant('COMMON.PERMISSIONS')
    );
  }

  commonError() {
    this.notificationsService.error(
      this.translateService.instant('COMMON.ERROR_OCCURED'),
      this.translateService.instant('COMMON.ERROR_ACTION')
    );
  }
}
