import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserStore } from '../store/user.store';

interface User {
  id: string;
  email: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users = inject(UserStore);

  constructor(private http: HttpClient) {}

  async boot(): Promise<void> {
    this.users.setNotReady();
    try {
      const me = await firstValueFrom(
        this.http.get(`${environment.api}/me`, { withCredentials: true })
      ); // or add auth header via interceptor;
      this.users.setUser(me as any);
    } catch {
      this.users.reset(); // ready=true, user=null
    }
  }

  async getCsrfToken(): Promise<void> {
    await this.http
      .get(`${environment.api}/sanctum/csrf-cookie`, {
        withCredentials: true,
      })
      .toPromise();
  }

  async login(email: string, password: string): Promise<any> {
    await this.getCsrfToken();
    return this.http
      .post(`${environment.api}/login`, { email, password }, { withCredentials: true })
      .toPromise();
  }

  async logout(): Promise<void> {
    await firstValueFrom(
      this.http.post(`${environment.api}/logout`, {}, { withCredentials: true })
    );
    this.users.reset();
  }

  signup(email: string, password: string, name: string): Observable<any> {
    return this.http.post(
      `${environment.api}/signup`,
      { email, password, name },
      { withCredentials: true }
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(
      `${environment.api}/reset-password`,
      { email },
      { withCredentials: true }
    );
  }
}
