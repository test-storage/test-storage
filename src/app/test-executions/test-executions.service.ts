import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Testrun } from './testrun';

@Injectable()
export class TestrunsService {

  private apiPath = '/api/v1/testruns';

  constructor(private http: HttpClient) { }

  public getTestruns(): Observable<Testrun[]> {
    return this.http.get<Testrun[]>(this.apiPath);
  }

  public getTestrun(id: string): Observable<Testrun> {
    return this.http.get<Testrun>(`${this.apiPath}/${id}`);
  }

  public createTestrun(testrun: Testrun) {
    return this.http.post(this.apiPath, testrun, { observe: 'response' });
  }

  public deleteTestrun(id: string) {
    return this.http.delete(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
