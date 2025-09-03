import { Routes } from '@angular/router';
import { Workspace } from './components/workspace/workspace';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'workspace',
    component: Workspace,
    canActivate: [authGuard],
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
        path: 'projects',
        loadComponent: () =>
          import('./features/project/project.component').then((m) => m.ProjectComponent),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients.component').then((m) => m.ClientsComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
];
