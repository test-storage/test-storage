import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestSuite } from './test-suite';

@Injectable()
export class TestSuiteService {

  apiPath = '/api/v1/testsuites';

  constructor(private http: HttpClient) { }

  public getTestSuites(): Observable<TestSuite[]> {
    return this.http.get<TestSuite[]>(this.apiPath);
  }

  public getTestSuite(id: string): Observable<TestSuite> {
    return this.http.get<TestSuite>(this.apiPath + '/' + id);
  }

  public createTestSuite(testsuite: TestSuite) {
    return this.http.post(this.apiPath, testsuite, { observe: 'response' });
  }

  public deleteTestSuite(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
