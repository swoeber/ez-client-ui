import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserStore } from '../store/user.store';

export const requirePerm =
  (...permIds: number[]): CanMatchFn =>
  () => {
    const store = inject(UserStore);
    const router = inject(Router);

    // Optional: wait until boot finished; otherwise deny early.
    if (!store.ready()) return router.parseUrl('/login');

    return store.allOf(permIds) ? true : router.parseUrl('/forbidden');
  };
