import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface Project {
  id: number;
  account_id: string;
  owner_user_id: string;
  client_id: string;
  name: string;
  slug: string;
  status: string;
  percent_complete: string;
  starts_on: string;
  due_on: string;
  summary: string;
  meta: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectQueryParams {
  sort?: string;
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
  client_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }

  all(params?: ProjectQueryParams): Observable<Project[]> {
    let httpParams = new HttpParams();

    if (params?.sort) httpParams = httpParams.set('sort', params.sort);
    if (params?.direction) httpParams = httpParams.set('direction', params.direction);
    if (params?.per_page) httpParams = httpParams.set('per_page', params.per_page.toString());
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.client_id) httpParams = httpParams.set('client_id', params.client_id);

    return this.http.get<Project[]>(`${environment.api}/projects`, {
      withCredentials: true,
      params: httpParams
    });
  }

  get(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.api}/projects/${id}`, {
      withCredentials: true,
    });
  };
}
