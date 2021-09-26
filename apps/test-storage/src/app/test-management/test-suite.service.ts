import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  public createTestSuite(testsuite: TestSuite): Observable<HttpResponse<TestSuite>> {
    return this.http.post<TestSuite>(this.apiPath, testsuite, { observe: 'response' });
  }

  public updateTestSuite(testsuite: TestSuite, id?: string): Observable<HttpResponse<TestSuite>>{
    if (id !== undefined) {
      return this.http.put<TestSuite>(`${this.apiPath}/${id}`, testsuite, { observe: 'response' });
    } else {
      return this.createTestSuite(testsuite);
    }
  }

  public deleteTestSuite(id: string): Observable<HttpResponse<TestSuite>> {
    return this.http.delete<TestSuite>(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
