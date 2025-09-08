// breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs = this.buildBreadcrumbs(root);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const newBreadcrumbs = [...breadcrumbs];
    const { breadcrumb } = route.data;
    const newUrl = url + '/' + route.url.map((segment) => segment.path).join('/');

    if (breadcrumb) {
      newBreadcrumbs.push({ label: breadcrumb, url: newUrl });
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, newUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
