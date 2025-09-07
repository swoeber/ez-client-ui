import {Routes} from '@angular/router';
import {Workspace} from './components/workspace/workspace';
import {authGuard} from './guards/auth.guard';

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
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/project/project.component').then((m) => m.ProjectComponent),
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

    ],
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
];
