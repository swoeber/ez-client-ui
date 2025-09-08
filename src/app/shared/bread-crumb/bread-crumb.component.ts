// breadcrumbs.component.ts
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  label: string;
  /** Router link commands or absolute path. Omit/undefined = not clickable */
  url?: string | any[];
  query?: any;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, NgIf],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss',
})
export class BreadcrumbsComponent {
  @Input() crumbs: Crumb[] = [];
}
