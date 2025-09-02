import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, firstValueFrom} from 'rxjs';
import {environment} from '../../../../ez-client-ui-bck/src/environments/environment';

interface User {
  id: string;
  email: string;
  name?: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = signal<User | null>(null);

  constructor(private http: HttpClient) {
  }

  async boot(): Promise<void> {
    try {
      const me = await firstValueFrom(this.http.get<User>(`${environment.api}/me`, {withCredentials: true}));
      this.user.set(me);
    } catch {
      this.user.set(null);
    }
  }

  async getCsrfToken(): Promise<void> {
    await this.http.get(`${environment.api}/sanctum/csrf-cookie`, {
      withCredentials: true
    }).toPromise();
  }

  async login(email: string, password: string): Promise<any> {
    await this.getCsrfToken();
    return this.http.post(`${environment.api}/login`, {email, password}, {withCredentials: true}).toPromise();
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.api}/logout`, {}, {withCredentials: true});
  }

  signup(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${environment.api}/signup`, {email, password, name}, {withCredentials: true});
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${environment.api}/reset-password`, {email}, {withCredentials: true});
  }
}
