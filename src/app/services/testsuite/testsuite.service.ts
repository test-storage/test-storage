import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testsuite } from '../../models/testsuite';

@Injectable()
export class TestsuiteService {

  apiPath = '/api/v1/testsuites';

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getTestsuites(): Observable<Testsuite[]> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.get(this.apiPath, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public createTestsuite(testsuite: Testsuite): Observable<Number> {
    const body = JSON.stringify(testsuite);

    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.post(this.apiPath, body, options)
      .map((response: Response) => response.status) // response.json())
      .catch(this.handleError);
  }

  public deleteTestsuite(id: string): Observable<Number> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.delete(this.apiPath + '/' + id, options)
      .map((response: Response) => response.status)
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
  }
}
