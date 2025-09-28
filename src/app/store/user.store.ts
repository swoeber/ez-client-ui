import {Injectable, signal, computed} from '@angular/core';
import { AccountUserProfile, AccountUserLicense, AccountUserSpecialty, AccountUserCompliance } from '../interfaces';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  suffix: string;
  prefix: string;
  full_name: string;
  avatar_url?: string | null;
  account_id: number;
  account_profile?: AccountUserProfile;
  account_permissions?: string[];
  account_licenses?: AccountUserLicense[];
  account_specialties?: AccountUserSpecialty[];
  account_compliance?: AccountUserCompliance[];
  account_roles: {
    id: number;
    name: string;
  }[];
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
    return new Set<string>(m?.account_permissions?.map(p => p) ?? []);
  });

  readonly rolesSet = computed(() => {
    const m = this._user();
    return new Set<string>(m?.account_roles?.map(r => r.name) ?? []);
  })

  has = (perm: string) => this.permissionsSet().has(perm);

  hasRole = (role: string) => this.rolesSet().has(role);

  anyOf = (perms: string[]) => {
    const s = this.permissionsSet();
    for (const id of perms) if (s.has(id)) return true;
    return false;
  };

  anyRoleOf = (roles: string[]) => {
    const s = this.rolesSet();
    for (const id of roles) if (s.has(id)) return true;
    return false;
  };

  allOf = (perms: string[]) => {
    const s = this.permissionsSet();
    for (const id of perms) if (!s.has(id)) return false;
    return true;
  };

  allRolesOf = (roles: string[]) => {
    const s = this.rolesSet();
    for (const id of roles) if (!s.has(id)) return false;
    return true;
  };

  reset() {
    this._user.set(null);
    this._ready.set(true);
  }
}
