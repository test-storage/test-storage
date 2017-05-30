import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testcase } from '../../models/testcase';

@Injectable()
export class TestcaseService {

  apiPath = '/api/v1/testcases';

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getTestcases(): Observable<Testcase[]> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.get(this.apiPath, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getTestcase(id: string): Observable<Testcase> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.get(this.apiPath + '/' + id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public createTestcase(testcase: Testcase): Observable<Testcase> {
    const body = JSON.stringify(testcase);

    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    return this.http.post(this.apiPath, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
