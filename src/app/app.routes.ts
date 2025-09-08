import { Routes } from '@angular/router';
import { Workspace } from './components/workspace/workspace';
import { authGuard } from './guards/auth.guard';
import { WorkorderResolver } from './resolver/workorder.resolver';

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
        path: 'projects/:id/workorder/:workorderId',
        resolve: { workorder: WorkorderResolver }, // returns { id, code }
        loadComponent: () =>
          import('./features/project/components/work-order/work-order.component').then(
            (m) => m.WorkOrderComponent
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
      //     import('./features/project/components/work-order/work-order.component').then(
      //       (m) => m.WorkOrderComponent
      //     ),
      // },
    ],
  },
  {
    path: 'work-orders',
    loadComponent: () =>
      import('./features/project/components/work-order-list/work-order-list.component').then(
        (m) => m.WorkOrderListComponent
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
