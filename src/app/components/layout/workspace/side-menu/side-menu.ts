import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Perm } from '../../../../enum/permissions.model';
import { CanDirective } from '../../../../directives/can.directive';
import { UserStore } from '../../../../store/user.store';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive, CanDirective],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  userStore = inject(UserStore);
  Perm = Perm;
}
