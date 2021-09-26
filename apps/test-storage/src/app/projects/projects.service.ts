import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from './project';

@Injectable()
export class ProjectsService {

  apiPath = '/api/v1/projects';

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiPath);
  }

  public getProject(id: string): Observable<Project> {
    return this.http.get<Project>(this.apiPath + '/' + id);
  }

  public createProject(project: Project): Observable<HttpResponse<Project>> {
    return this.http.post<Project>(this.apiPath, project, { observe: 'response' });
  }

  public updateProject(project: Project, id?: string): Observable<HttpResponse<Project>> {
    if (id !== undefined) {
      return this.http.put<Project>(`${this.apiPath}/${id}`, project, { observe: 'response' });
    } else {
      return this.createProject(project);
    }
  }

  public deleteProject(id: string): Observable<any> {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
