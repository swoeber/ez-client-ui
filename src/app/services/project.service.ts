import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../store/user.store';

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
  milestones: Milestone[];
  workitems: WorkItem[];
  invoices: Invoice[];
  messages: Message[];
  files: File[];
  type: number;
}

export interface WorkItem {
  "id": number;
  "project_id": number;
  "workflow": 'freelance' | 'field_job';
  "kind": 'milestone' | 'checklist_step';
  "title": string;
  "description": string;
  "status": 'todo' | 'not_started' | 'en_route' | 'on_site' | 'in_progress' | 'on_hold' | 'waiting_on_parts' | 'awaiting_signature' | 'done' | 'waiting_on_client' | 'blocked' | 'canceled';
  "position": 1;
  "due_on": string;
  "started_at": string;
  "completed_at": string;
  "assigned_to": number;
  "assignee": User;
  "requires_approval": number; //used by freelance
  "approved_at": string;
  "approved_by": User;
  "approver": User;
  "waiting_on_client": number; //convenience for freelance UX
  "blocked_by_id": null;
  "visibility": string;
  "percent_complete": number;
  "created_by": number;
  "creator": User;
  "updated_by": string;
  "deleted_at": string;
  "created_at": string;
  "updated_at": string;
  "tasks": Task[]
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  completed_on: string;
  completed_by: User;
}

export interface Milestone {
  id: number;
  project_id: number;
  title: string;
  status: string;
  order: number;
  due_on: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  project_id: number;
  number: string;
  currency: string;
  amount_cents: number;
  status: string;
  due_on: null;
  provider: string;
  provider_ref: null;
  payment_intent: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  project_id: number;
  user_id: number;
  author: User;
  body: string;
  is_system: boolean;
  created_at: string;
  updated_at: string;
}

export interface File {
  id: number;
  project_id: number;
  user_id: number;
  name: string;
  s3_key: string;
  content_type: string;
  size_bytes: number;
  version: number;
  is_latest: boolean;
  meta: string;
  created_at: '2025-09-03T20:45:20.000000Z';
  updated_at: '2025-09-03T20:45:20.000000Z';
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
      params: httpParams,
    });
  }

  get(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.api}/projects/${id}`, {
      withCredentials: true,
    });
  }
}
