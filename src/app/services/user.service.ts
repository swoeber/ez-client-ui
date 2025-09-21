import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../store/user.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAccountMembers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/users`, {
      withCredentials: true,
    });
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${environment.api}/users`, user, {
      withCredentials: true,
    });
  }

  updateUser(data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${environment.api}/users/${data.id}`, data, {
      withCredentials: true,
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/users/${id}`, {
      withCredentials: true,
    });
  }
}
