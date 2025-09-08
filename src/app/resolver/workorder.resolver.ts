// workorder.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ResolveFn } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { WorkItem, WorkOrderService } from '../services/work-order.service';

export const WorkorderResolver: ResolveFn<WorkItem> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('workorderId'));
  const projectId = Number(route.paramMap.get('id'));
  const router = inject(Router);
  const svc = inject(WorkOrderService);

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
