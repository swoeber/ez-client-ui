// import { inject } from '@angular/core';
// import { CanMatchFn, Router } from '@angular/router';
// import { UserStore } from '../store/user.store';
// import { toObservable } from '@angular/core/rxjs-interop';
// import { filter, firstValueFrom, take } from 'rxjs';

// async function waitUntilReady(store: UserStore): Promise<void> {
//   await firstValueFrom(
//     toObservable(store.ready).pipe(
//       filter(Boolean), // wait until ready === true
//       take(1)
//     )
//   );
// }

// export const authGuard: CanMatchFn = async () => {
//   const users = inject(UserStore);
//   const router = inject(Router);

//   await waitUntilReady(users);

//   if (!users.isAuthed()) {
//     router.navigateByUrl('/login');
//     return false;
//   }
//   return true;
// };

import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserStore } from '../store/user.store';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async () => {
  const users = inject(UserStore);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!users.ready()) {
    await auth.boot(); // first time only; deduped by bootPromise
  }

  if (!users.isAuthed()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
