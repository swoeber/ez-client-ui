import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../store/user.store';
import { WorkItem } from './work-item.service';


export interface Project {
  id: number;
  account_id: number;
  owner_user_id: number;
  client_id: number;
  assignee_id?: number | null;

  name: string;
  slug: string;

  status:
    | 'todo'
    | 'not_started'
    | 'en_route'
    | 'on_site'
    | 'in_progress'
    | 'on_hold'
    | 'waiting_on_parts'
    | 'awaiting_signature'
    | 'done'
    | 'waiting_on_client'
    | 'blocked'
    | 'canceled';
  // percent_complete: number;

  starts_on?: string | null; // ISO8601 date string: "2025-09-11"
  due_on?: string | null; // ISO8601 date string

  summary?: string | null;
  meta?: Record<string, any> | null; // flexible JSON

  service_address_line1?: string | null;
  service_address_line2?: string | null;
  service_city?: string | null;
  service_state?: string | null;
  service_postal_code?: string | null;
  service_country?: string | null;

  service_latitude?: number | null;
  service_longitude?: number | null;

  service_place_name?: string | null;
  service_access_notes?: string | null;

  deleted_at?: string | null; // ISO8601 datetime
  created_at: string; // ISO8601 datetime
  updated_at: string; // ISO8601 datetime

  milestones: Milestone[];
  workitems: WorkItem[];
  invoices: Invoice[];
  messages: Message[];
  assignee?: User;
  files: File[];
  owner?: User;

  type: number; // e.g. "freelance" | "field_job"
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
  author?: User;
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
  constructor(private http: HttpClient) {}

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
