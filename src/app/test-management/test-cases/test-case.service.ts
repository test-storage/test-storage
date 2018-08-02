import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TestCase } from './test-case';

@Injectable()
export class TestCaseService {

  apiPath = '/api/v1/testcases';

  constructor(private http: HttpClient) { }

  public getTestCases(): Observable<TestCase[]> {
    return this.http.get<TestCase[]>(this.apiPath);
  }

  public getTestCase(id: string): Observable<TestCase> {
    return this.http.get<TestCase>(`${this.apiPath}/${id}`);
  }

  public getTestCasesBySuiteId(id: string): Observable<TestCase[]> {
    const params = new HttpParams().set('testSuiteId', id);
    return this.http.get<TestCase[]>(this.apiPath, { params: params });
  }

  public getTestCasesByProjectId(id: string, status?: string): Observable<TestCase[]> {
    let params = new HttpParams().set('projectId', id);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<TestCase[]>(this.apiPath, { params: params });
  }

  public createTestCase(testcase: TestCase) {
    return this.http.post(this.apiPath, testcase, { observe: 'response' });
  }

  public updateTestCase(testcase: TestCase, id?: string) {
    if (id !== undefined) {
    return this.http.put(`${this.apiPath}/${id}`, testcase, { observe: 'response' });
    } else {
      return this.createTestCase(testcase);
    }
  }

  public deleteTestCase(id: string) {
    return this.http.delete(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
