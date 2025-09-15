import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../store/user.store';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateProfile(profileData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.api}/profile`, profileData, {
      withCredentials: true
    });
  }

  uploadProfileImage(file: File): Observable<{ image_url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.http.post<{ image_url: string }>(`${environment.api}/profile/avatar`, formData, {
      withCredentials: true
    });
  }

  deleteProfileImage(): Observable<void> {
    return this.http.delete<void>(`${environment.api}/profile/avatar`, {
      withCredentials: true
    });
  }
}