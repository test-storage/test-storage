import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { UserGroup } from '../../models/usergroup';

@Injectable()
export class UserGroupService {

  apiPath = '/api/v1/groups';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getUserGroups(): Observable<UserGroup[]> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.get<UserGroup[]>(this.apiPath, { headers: contentHeaders });
  }

  /*
    private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
    }
  */
}
