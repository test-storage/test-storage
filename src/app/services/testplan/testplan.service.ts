import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../auth/index';
import { Testplan } from '../../models/testplan';

@Injectable()
export class TestplanService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getTestplans(): Observable<Testplan[]> {
    return this.http.get<Testplan[]>('/api/v1/testplans');
  }

}
