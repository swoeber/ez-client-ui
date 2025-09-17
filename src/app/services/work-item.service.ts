import { Injectable } from '@angular/core';
import { User } from '../store/user.store';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


export interface WorkItem {
  id: number;
  project_id: number;
  title: string;
  type: 'signature' | 'task_list' | 'standard';
  completed: boolean;
  description: string;
  position: 1;
  due_on: string;
  started_at: string;
  completed_at: string;
  created_by: number;
  creator: User;
  require_photos: boolean;
  completion_required: boolean;
  updated_by: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  order: number;
  tasks: Task[];
  image_url?: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  completed_on: string;
  completed_by: User;
}

// export interface WorkItem {
//   id: number;
//   project_id: number;
//   workflow: 'freelance' | 'field_job';
//   kind: 'milestone' | 'checklist_step';
//   title: string;
//   description: string;
//   status:
//     | 'todo'
//     | 'not_started'
//     | 'en_route'
//     | 'on_site'
//     | 'in_progress'
//     | 'on_hold'
//     | 'waiting_on_parts'
//     | 'awaiting_signature'
//     | 'done'
//     | 'waiting_on_client'
//     | 'blocked'
//     | 'canceled';
//   position: 1;
//   due_on: string;
//   started_at: string;
//   completed_at: string;
//   assigned_to: number;
//   assignee: User;
//   requires_approval: number; //used by freelance
//   approved_at: string;
//   approved_by: User;
//   approver: User;
//   waiting_on_client: number; //convenience for freelance UX
//   blocked_by_id: null;
//   visibility: string;
//   percent_complete: number;
//   created_by: number;
//   creator: User;
//   updated_by: string;
//   deleted_at: string;
//   created_at: string;
//   updated_at: string;
//   tasks: Task[];
// }

// export interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
//   completed_on: string;
//   completed_by: User;
// }

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

  list(projectId: number): Observable<WorkItem[]> {
    return this.http.get<WorkItem[]>(`${environment.api}/projects/${projectId}/workitems`, {
      withCredentials: true,
    });
  }

  create(projectId: number, workItem: Partial<WorkItem>): Observable<WorkItem> {
    return this.http.post<WorkItem>(`${environment.api}/projects/${projectId}/workitems`, workItem, {
      withCredentials: true,
    });
  }

  update(projectId: number, id: number, workItem: Partial<WorkItem>): Observable<WorkItem> {
    return this.http.put<WorkItem>(`${environment.api}/projects/${projectId}/workitems/${id}`, workItem, {
      withCredentials: true,
    });
  }

  delete(projectId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/projects/${projectId}/workitems/${id}`, {
      withCredentials: true,
    });
  }

  uploadImage(projectId: number, id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.api}/projects/${projectId}/workitems/${id}/image`, formData, {
      withCredentials: true,
    });
  }

  removeImage(projectId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/projects/${projectId}/workitems/${id}/image`, {
      withCredentials: true,
    });
  }
}
