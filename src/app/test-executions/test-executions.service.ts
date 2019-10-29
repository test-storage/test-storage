import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Testrun } from './testrun';

@Injectable()
export class TestrunsService {

  private apiPath = '/api/v1/testruns';

  constructor(private http: HttpClient) { }

  public getTestruns(): Observable<Testrun[]> {
    return this.http.get<Testrun[]>(this.apiPath);
  }

  public getTestrunsByProjectId(projectId: string): Observable<Testrun[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<Testrun[]>(this.apiPath, { params });
  }

  public getTestrun(id: string): Observable<Testrun> {
    return this.http.get<Testrun>(`${this.apiPath}/${id}`);
  }

  public createTestrun(testrun: Testrun) {
    return this.http.post(this.apiPath, testrun, { observe: 'response' });
  }

  public updateTestrun(testrun: Testrun, id?: string) {
    if (id !== undefined) {
      return this.http.put(`${this.apiPath}/${id}`, testrun, { observe: 'response' });
    } else {
      return this.createTestrun(testrun);
    }
  }

  public deleteTestrun(id: string) {
    return this.http.delete(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
