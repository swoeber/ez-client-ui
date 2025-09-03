import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserStore } from '../../../../store/user.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  auth = inject(AuthService);
  users = inject(UserStore);
  router = inject(Router);

  me$ = toObservable(this.users.user);

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
