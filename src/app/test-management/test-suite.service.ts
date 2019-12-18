import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TestSuite } from './test-suite';

@Injectable()
export class TestSuiteService {

  apiPath = '/api/v1/testsuites';

  constructor(private http: HttpClient) { }

  public getTestSuites(): Observable<TestSuite[]> {
    return this.http.get<TestSuite[]>(this.apiPath);
  }

  public getTestSuitesByProjectId(projectId: string): Observable<TestSuite[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<TestSuite[]>(this.apiPath, { params });
  }

  public getTestSuite(id: string): Observable<TestSuite> {
    return this.http.get<TestSuite>(`${this.apiPath}/${id}`);
  }

  public createTestSuite(testsuite: TestSuite) {
    return this.http.post(this.apiPath, testsuite, { observe: 'response' });
  }

  public updateTestSuite(testsuite: TestSuite, id?: string) {
    if (id !== undefined) {
      return this.http.put(`${this.apiPath}/${id}`, testsuite, { observe: 'response' });
    } else {
      return this.createTestSuite(testsuite);
    }
  }

  public deleteTestSuite(id: string) {
    return this.http.delete(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
