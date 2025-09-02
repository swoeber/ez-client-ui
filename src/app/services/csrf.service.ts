import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  constructor() {
  }

  async getCsrfToken(): Promise<string | null> {
    const response = await fetch('/sanctum/csrf-cookie', {credentials: 'include'});
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=').map(s => s.trim());
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
}
