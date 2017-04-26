import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testsuite } from '../../models/testsuite';

@Injectable()
export class TestsuiteService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getTestplans(): Observable<Testsuite[]> {
    // add authorization header with jwt token
    contentHeaders.append('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    // get test suites from api
    return this.http.get('/api/v1/testsuites', options)
      .map((response: Response) => response.json());
    // .catch(this.handleError); // TODO error handling
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
