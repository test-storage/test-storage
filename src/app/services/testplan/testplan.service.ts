import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testplan } from '../../models/testplan';

@Injectable()
export class TestplanService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getTestplans(): Observable<Testplan[]> {
    // add authorization header with jwt token
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.get<Testplan[]>('/api/v1/testplans', { headers: contentHeaders });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  /*
    private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
    }
  */
}
