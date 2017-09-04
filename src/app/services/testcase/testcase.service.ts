import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Testcase } from '../../models/testcase';

@Injectable()
export class TestcaseService {

  apiPath = '/api/v1/testcases';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getTestcases(): Observable<Testcase[]> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.get<Testcase[]>(this.apiPath, { headers: contentHeaders });
  }

  public getTestcase(id: string): Observable<Testcase> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.get<Testcase>(this.apiPath + '/' + id, { headers: contentHeaders });
  }

  public createTestcase(testcase: Testcase): Observable<Number> {
    const body = JSON.stringify(testcase);
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.post(this.apiPath, body, { headers: contentHeaders })
      .map((response: Response) => response.status); // response.json())
     // .catch(this.handleError);
  }

  public deleteTestcase(id: string): Observable<Number> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.delete(this.apiPath + '/' + id, { headers: contentHeaders })
      .map((response: Response) => response.status);
     // .catch(this.handleError);
  }

/*
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
  }
  */
}
