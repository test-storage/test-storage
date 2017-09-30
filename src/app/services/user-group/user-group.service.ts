import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserGroup } from '../../models/usergroup';

@Injectable()
export class UserGroupService {

  apiPath = '/api/v1/groups';

  constructor(private http: HttpClient) { }

  public getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(this.apiPath);
  }

}
