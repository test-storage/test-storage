import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../auth/index';
import { Project } from '../../models/project';

@Injectable()
export class ProjectService {

  apiPath = '/api/v1/projects';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiPath);
  }

  public getProject(id: string): Observable<Project> {
    return this.http.get<Project>(this.apiPath + '/' + id);
  }

  public createProject(project: Project) {
    return this.http.post(this.apiPath, project, { observe: 'response' });
  }

  public deleteProject(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
