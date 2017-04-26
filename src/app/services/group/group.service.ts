import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../auth/index';
import { Group } from '../../models/group';

@Injectable()
export class GroupService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getGroups(): Observable<Group[]> {
    // add authorization header with jwt token
    const headers = new Headers({ 'x-access-token': this.authenticationService.token });
    const options = new RequestOptions({ headers: headers });

    // get user groups from api
    return this.http.get('/api/v1/groups', options)
      .map((response: Response) => response.json());
    // .catch(this.handleError); // TODO error handling
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
