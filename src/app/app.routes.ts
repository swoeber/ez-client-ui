import { Routes } from '@angular/router';
import { Workspace } from './components/workspace/workspace';
import { authGuard } from './guards/auth.guard';
import { WorkitemResolver } from './resolver/workitem.resolver';
import { userResolver } from './resolver/user.resolver';

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
        path: 'users',
        loadComponent: () =>
          import('./features/user-list/user-list.component').then((m) => m.UserListComponent),
      },
      {
        path: 'users/new',
        loadComponent: () =>
          import('./features/user-list/user-form/user-form.component').then((m) => m.UserFormComponent),
      },
      {
        path: 'users/:id',
        resolve: { user: userResolver },
        loadComponent: () =>
          import('./features/user-dashboard/user-dashboard.component').then((m) => m.UserDashboardComponent),
      },
      {
        path: 'users/:id/edit',
        resolve: { user: userResolver },
        loadComponent: () =>
          import('./features/user-list/user-form/user-form.component').then((m) => m.UserFormComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./features/project/pages/form/project-form-page.component').then(
            (m) => m.ProjectFormPageComponent
          ),
      },
      {
        path: 'projects/:id/edit',
        loadComponent: () =>
          import('./features/project/pages/form/project-form-page.component').then(
            (m) => m.ProjectFormPageComponent
          ),
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
    path: 'complete-registration',
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
