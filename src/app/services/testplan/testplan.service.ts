import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testplan } from '../../models/testplan';

@Injectable()
export class TestplanService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getTestplans(): Observable<Testplan[]> {
    // add authorization header with jwt token
    contentHeaders.append('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    // get test plans from api
    return this.http.get('/api/v1/testplans', options)
      .map((response: Response) => response.json());
    // .catch(this.handleError); // TODO error handling
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
