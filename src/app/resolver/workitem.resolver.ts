// workorder.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ResolveFn } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { WorkItem, WorkItemService } from '../services/work-item.service';

export const WorkitemResolver: ResolveFn<WorkItem> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('workorderId'));
  const projectId = Number(route.paramMap.get('id'));
  const router = inject(Router);
  const svc = inject(WorkItemService);

  return svc.get(projectId, id).pipe(
    tap((wo: WorkItem) => {
      document.title = `${wo.id}${wo.title ? ' – ' + wo.title : ''} • EZClientPro`;
    }),
    catchError(() => {
      router.navigate(['/not-found'], { replaceUrl: true });
      return of(null as unknown as WorkItem);
    })
  );
};
