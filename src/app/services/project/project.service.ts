import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService, contentHeaders } from '../auth/index';
import { Project } from '../../models/project';

@Injectable()
export class ProjectService {

  apiPath = '/api/v1/projects';

  constructor(
    private notificationsService: NotificationsService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiPath);
  }

  public getProject(id: string): Observable<Project> {
    let headers = contentHeaders;
    headers = contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.get<Project>(this.apiPath + '/' + id, { headers: headers });
  }

  public createProject(project: Project): Observable<Object> {
    const body = JSON.stringify(project);
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.post(this.apiPath, body, { headers: contentHeaders });
  }

  public deleteProject(id: string): Observable<Object> {
    contentHeaders.set('x-access-token', this.authenticationService.token);
    return this.http.delete(this.apiPath + '/' + id, { headers: contentHeaders });
  }


  /*
    private handleError(error: Response) {
      console.error(error);
      this.notificationsService.alert(error.json().status, error.json().message || 'Server error');
      return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
    }
   */
}
