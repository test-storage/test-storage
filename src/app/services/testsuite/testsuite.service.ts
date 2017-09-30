import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Testsuite } from '../../models/testsuite';

@Injectable()
export class TestsuiteService {

  apiPath = '/api/v1/testsuites';

  constructor(private http: HttpClient) { }

  public getTestsuites(): Observable<Testsuite[]> {
    return this.http.get<Testsuite[]>(this.apiPath);
  }

  public createTestsuite(testsuite: Testsuite) {
    return this.http.post(this.apiPath, testsuite, { observe: 'response' });
  }

  public deleteTestsuite(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
