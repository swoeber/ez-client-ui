import { Injectable } from '@angular/core';
import { User } from '../store/user.store';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface WorkItem {
  id: number;
  project_id: number;
  workflow: 'freelance' | 'field_job';
  kind: 'milestone' | 'checklist_step';
  title: string;
  description: string;
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
  position: 1;
  due_on: string;
  started_at: string;
  completed_at: string;
  assigned_to: number;
  assignee: User;
  requires_approval: number; //used by freelance
  approved_at: string;
  approved_by: User;
  approver: User;
  waiting_on_client: number; //convenience for freelance UX
  blocked_by_id: null;
  visibility: string;
  percent_complete: number;
  created_by: number;
  creator: User;
  updated_by: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  completed_on: string;
  completed_by: User;
}

@Injectable({
  providedIn: 'root',
})
export class WorkItemService {
  constructor(private http: HttpClient) {}

  get(projectId: number, id: number): Observable<WorkItem> {
    return this.http.get<WorkItem>(`${environment.api}/projects/${projectId}/workitems/${id}`, {
      withCredentials: true,
    });
  }
}
