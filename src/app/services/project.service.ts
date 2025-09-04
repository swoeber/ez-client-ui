import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  all(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api}/projects`, { withCredentials: true });
  }
}
