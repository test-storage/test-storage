import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Role } from './role';

@Injectable()
export class RolesService {

  apiPath = '/api/v1/roles';

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiPath);
  }

  public getRole(id: string): Observable<Role> {
    return this.http.get<Role>(this.apiPath + '/' + id);
  }

  public createRole(role: Role) {
    return this.http.post(this.apiPath, role, { observe: 'response' });
  }

  public deleteRole(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }


}
