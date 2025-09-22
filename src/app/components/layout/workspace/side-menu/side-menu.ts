import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Perm } from '../../../../enum/permissions.model';
import { CanDirective } from '../../../../directives/can.directive';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive, CanDirective],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  Perm = Perm;
}
