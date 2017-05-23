import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { Project } from '../../models/project';

@Injectable()
export class ProjectService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  public getProjects(): Observable<Project[]> {
    // add authorization header with jwt token
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    // get projects from api
    return this.http.get('/api/v1/projects', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public createProject(project: Project): Observable<Project> {
    const body = JSON.stringify(project);

    // add authorization header with jwt token
    contentHeaders.set('x-access-token', this.authenticationService.token);
    const options = new RequestOptions({ headers: contentHeaders });

    // create project
    return this.http.post('/api/v1/projects', body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }



  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
