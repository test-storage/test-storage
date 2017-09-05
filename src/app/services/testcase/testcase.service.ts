import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../auth/index';
import { Testcase } from '../../models/testcase';

@Injectable()
export class TestcaseService {

  apiPath = '/api/v1/testcases';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getTestcases(): Observable<Testcase[]> {
    return this.http.get<Testcase[]>(this.apiPath);
  }

  public getTestcase(id: string): Observable<Testcase> {
    return this.http.get<Testcase>(this.apiPath + '/' + id);
  }

  public createTestcase(testcase: Testcase) {
    return this.http.post(this.apiPath, testcase, { observe: 'response' });
  }

  public deleteTestcase(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
