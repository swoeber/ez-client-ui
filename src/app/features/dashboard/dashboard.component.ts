import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableColumn,
  TableOptions,
} from '../../shared/components/data-table/data-table.component';
import { Client, ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Project, ProjectService } from '../../services/project.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DataTableComponent, CommonModule, RouterLink],
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
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Client Name', sortable: true },
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email' },
  ];

  projectColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Project Name', sortable: true },
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: false,
    showPagination: false,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  ngOnInit() {
    // this.loadClients();
    this.clients$ = this.clientService.getClients();
    this.projects$ = this.projectService.all();
  }

  goToProjects() {
    this.router.navigateByUrl('workspace/projects')
  }

  goToClients() {
    this.router.navigateByUrl('workspace/clients')
  }

  openOnboarding() {}

  createProject() {}

  inviteClient() {}

  goFiles() {}

  newInvoice() {}
}
