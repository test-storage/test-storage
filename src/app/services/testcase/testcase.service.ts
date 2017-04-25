import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../auth/index';
import { Testcase } from '../../models/testcase';

@Injectable()
export class TestcaseService {
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getTestcases(): Observable<Testcase[]> {
    // add authorization header with jwt token
    const headers = new Headers({ 'x-access-token': this.authenticationService.token });
    const options = new RequestOptions({ headers: headers });

    // get test cases from api
    return this.http.get('/api/v1/testcases', options)
      .map((response: Response) => response.json());
    // .catch(this.handleError); // TODO error handling
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}