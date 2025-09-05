import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {
  DataTableComponent,
  TableColumn,
  TableOptions,
  ActionItem,
} from '../../shared/components/data-table/data-table.component';
import {Client, ClientService} from '../../services/client.service';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {Project, ProjectQueryParams, ProjectService} from '../../services/project.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  clientService: ClientService = inject(ClientService);
  projectService: ProjectService = inject(ProjectService);
  router: Router = inject(Router);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  done = 0;

  clients$: Observable<Client[]> = new Observable<Client[]>();
  projects$: Observable<Project[]> = new Observable<Project[]>();

  // Define Client columns
  clientColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Client Name', sortable: true},
    {key: 'first_name', label: 'First Name', sortable: true},
    {key: 'last_name', label: 'Last Name', sortable: true},
    {key: 'email', label: 'Email'},
  ];

  projectColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Project Name', sortable: true},
    {key: 'status', label: 'Status', sortable: true},
    {key: 'due_on', label: 'Due On', sortable: true, type: 'date'}
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: false,
    showPagination: false,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  // Define actions for clients
  clientActions: ActionItem[] = [
    {label: 'View', action: 'view', icon: 'eye'},
    {label: 'Edit', action: 'edit', icon: 'pencil', showActions: (item) => item.id !== 1},
    {
      label: 'Delete',
      action: 'delete',
      icon: 'trash',
      disabled: (item) => item.status === 'active',
      showActions: (item) => item.id !== 1
    }
  ];

  // Define actions for projects
  projectActions: ActionItem[] = [
    {label: 'View', action: 'view', icon: 'eye'},
    {label: 'Edit', action: 'edit', icon: 'pencil', showActions: (item) => item.status !== 'completed'},
    {label: 'Archive', action: 'archive', icon: 'archive', showActions: (item) => item.status !== 'archived'}
  ];

  ngOnInit() {
    // this.loadClients();
    const projectParams: ProjectQueryParams = {sort: 'due_on', direction: "desc"};

    this.clients$ = this.clientService.getClients();
    this.projects$ = this.projectService.all(projectParams);
  }

  goToProjects() {
    this.router.navigateByUrl('workspace/projects')
  }

  goToClients() {
    this.router.navigateByUrl('workspace/clients')
  }

  openOnboarding() {
  }

  createProject() {
  }

  inviteClient() {
  }

  goFiles() {
  }

  newInvoice() {
  }

  onClientAction(event: { action: string, item: any }) {
    switch (event.action) {
      case 'view':
        console.log('Viewing client:', event.item);
        break;
      case 'edit':
        console.log('Editing client:', event.item);
        break;
      case 'delete':
        console.log('Deleting client:', event.item);
        break;
    }
  }

  onProjectAction(event: { action: string, item: any }) {
    switch (event.action) {
      case 'view':
        console.log('Viewing project:', event.item);
        break;
      case 'edit':
        console.log('Editing project:', event.item);
        break;
      case 'archive':
        console.log('Archiving project:', event.item);
        break;
    }
  }
}
