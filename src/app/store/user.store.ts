import {Injectable, signal, computed} from '@angular/core';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

@Injectable({providedIn: 'root'})
export class UserStore {
  private _ready = signal(false);
  private _user = signal<User | null>(null);

  readonly ready = computed(() => this._ready());
  readonly user = computed(() => this._user());
  readonly isAuthed = computed(() => !!this._user());

  setNotReady() {
    this._ready.set(false);
  }

  setUser(u: User | null) {
    this._user.set(u);
    this._ready.set(true);
  }

  reset() {
    this._user.set(null);
    this._ready.set(true);
  }
}
