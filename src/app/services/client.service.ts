import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Client {
  id: number;
  account_id: number;
  company: string;
  created_at: string;
  currency: string;
  deleted_at: string;
  email: string;
  // meta
  prefix: string;
  first_name: string;
  last_name: string;
  suffix: string;
  notes: string;
  phone: string;
  timezone: string;
  updated_at: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.api}/clients`, { withCredentials: true });
  }
}
