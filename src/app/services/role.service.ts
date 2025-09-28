import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../interfaces/roles.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  http = inject(HttpClient);

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.api}/roles`, { withCredentials: true });
  }
}
