import {Injectable, signal, computed} from '@angular/core';
import { AccountUserProfile, AccountUserLicense, AccountUserSpecialty, AccountUserCompliance, AccountUserPermission } from '../interfaces';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  suffix: string;
  prefix: string;
  full_name: string;
  roles: string[];
  avatar_url?: string | null;
  account_profile?: AccountUserProfile;
  account_permissions?: AccountUserPermission[];
  account_licenses?: AccountUserLicense[];
  account_specialties?: AccountUserSpecialty[];
  account_compliance?: AccountUserCompliance[];
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

  readonly permissionsSet = computed(() => {
    const m = this._user();
    return new Set<number>(m?.account_permissions?.map(p => p.permission_id) ?? []);
  });

  has = (permId: number) => this.permissionsSet().has(+permId);

  anyOf = (permIds: number[]) => {
    const s = this.permissionsSet();
    for (const id of permIds) if (s.has(+id)) return true;
    return false;
  };

  allOf = (permIds: number[]) => {
    const s = this.permissionsSet();
    for (const id of permIds) if (!s.has(+id)) return false;
    return true;
  };

  reset() {
    this._user.set(null);
    this._ready.set(true);
  }
}
