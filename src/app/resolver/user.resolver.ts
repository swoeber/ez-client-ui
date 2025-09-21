import { ResolveFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../store/user.store';
import { catchError, of, tap } from 'rxjs';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  const router = inject(Router);
  const svc = inject(UserService);

  return svc.getUserById(id).pipe(
    tap((wo: User) => {
      document.title = `Edit User • EZClientPro`;
    }),
    catchError(() => {
      router.navigate(['/not-found'], { replaceUrl: true });
      return of(null);
    })
  );
};
