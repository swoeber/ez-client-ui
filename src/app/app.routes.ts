import { Routes } from '@angular/router';
import { Workspace } from './components/workspace/workspace';
import { authGuard } from './guards/auth.guard';
import { WorkitemResolver } from './resolver/workitem.resolver';

export const routes: Routes = [
  {
    path: 'workspace',
    component: Workspace,
    canActivate: [authGuard],
    data: { breadcrumb: 'Workspace' },
    loadChildren: () => [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/project/project.component').then((m) => m.ProjectComponent),
        data: { breadcrumb: 'Project' },
      },
      {
        path: 'projects/:id/workitem/:workItemId',
        resolve: { workitem: WorkitemResolver }, // returns { id, code }
        loadComponent: () =>
          import('./features/project/components/work-item/work-item.component').then(
            (m) => m.WorkItemComponent
          ),
        data: { breadcrumb: 'Work Item' },
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients.component').then((m) => m.ClientsComponent),
      },
      // {
      //   path: 'projects/:project_id/workorder/:id',
      //   loadComponent: () =>
      //     import('./features/project/components/work-item/work-item.component').then(
      //       (m) => m.WorkOrderComponent
      //     ),
      // },
    ],
  },
  {
    path: 'work-items',
    loadComponent: () =>
      import('./features/project/components/work-item-list/work-item-list.component').then(
        (m) => m.WorkItemListComponent
      ),
  },
  {
    path: 'workbench/:id',
    loadComponent: () =>
      import('./test/workbench/workbench.component').then((m) => m.WorkbenchComponent),
  },
  {
    path: 'workbench',
    loadComponent: () =>
      import('./test/workbench/workbench.component').then((m) => m.WorkbenchComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/marketing/marketing.component').then(
        (m) => m.EzClientProMarketingComponent
      ),
  },
];
