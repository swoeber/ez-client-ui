import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Client, ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';
import {
  TableColumn,
  DataTableComponent,
  TableOptions,
  ActionItem,
} from '../../shared/components/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalFormComponent } from '../../shared/components/modal-form/modal-form.component';
import { Project, ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-clients.component',
  imports: [DataTableComponent, CommonModule, FormsModule, ModalFormComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  clientService: ClientService = inject(ClientService);
  projectService: ProjectService = inject(ProjectService);
  router: Router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  clients$: Observable<Client[]> = new Observable<Client[]>();
  projects$: Observable<Project[]> = new Observable<Project[]>();
  showAddModal = false;
  showViewModal = false;
  showProjectsModal = false;
  newClient: Partial<Client> = {};
  viewingClient: Client | null = null;
  projectsClient: Client | null = null;
  isSubmitting = false;

  clientColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Client Name', sortable: true },
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email' },
  ];

  clientActions: ActionItem[] = [
    { label: 'View', action: 'view', icon: 'eye' },
    { label: 'View Projects', action: 'projects', icon: 'kanban' },
    { label: 'Edit', action: 'edit', icon: 'pencil' },
    {
      label: 'Delete',
      action: 'delete',
      icon: 'trash',
      disabled: (item) => item.status === 'active',
    },
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  projectColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'starts_on', label: 'Start Date', sortable: true, type: 'date' },
    { key: 'due_on', label: 'Due Date', sortable: true, type: 'date' },
  ];

  projectActions: ActionItem[] = [
    { label: 'View Project', action: 'view', icon: 'eye' },
    { label: 'Edit', action: 'edit', icon: 'pencil' },
  ];

  projectTableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 5,
    sortable: true,
  };

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clients$ = this.clientService.getClients();
  }

  openAddModal() {
    this.newClient = {};
    this.showAddModal = true;
  }

  openEditModal(client: Partial<Client>) {
    this.newClient = { ...client };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newClient = {};
    this.cdr.markForCheck();
  }

  openViewModal(client: Client) {
    this.viewingClient = client;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewingClient = null;
    this.cdr.markForCheck();
  }

  openProjectsModal(client: Client) {
    this.projectsClient = client;
    this.showProjectsModal = true;
    this.loadClientProjects(client.id);
  }

  closeProjectsModal() {
    this.showProjectsModal = false;
    this.projectsClient = null;
    this.cdr.markForCheck();
  }

  loadClientProjects(clientId: number) {
    this.projects$ = this.projectService.all({ client_id: clientId.toString() });
  }

  onSubmitClient() {
    if (!this.newClient.first_name || !this.newClient.last_name || !this.newClient.email) {
      return;
    }

    this.isSubmitting = true;

    if (this.newClient.id) {
      this.clientService.updateClient(this.newClient).subscribe({
        next: (result: Client) => {
          this.loadClients();
          this.closeAddModal();
          this.isSubmitting = false;
        },
        error: (error: any) => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.clientService.createClient(this.newClient).subscribe({
        next: (result) => {
          this.loadClients();
          this.closeAddModal();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.isSubmitting = false;
        },
      });
    }
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client.id).subscribe({
      next: () => {
        this.loadClients();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting client:', error);
      },
    });
  }

  isFormValid(): boolean {
    return !!(this.newClient.first_name && this.newClient.last_name && this.newClient.email);
  }

  onAction(event: { action: string; item: any }) {
    switch (event.action) {
      case 'view':
        this.openViewModal(event.item);
        break;
      case 'projects':
        this.openProjectsModal(event.item);
        break;
      case 'edit':
        this.openEditModal(event.item);
        break;
      case 'delete':
        this.deleteClient(event.item);
        break;
    }
  }

  onProjectAction(event: { action: string; item: any }) {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/workspace/projects', event.item.id]);
        this.closeProjectsModal();
        break;
      case 'edit':
        this.router.navigate(['/workspace/projects', event.item.id, 'edit']);
        this.closeProjectsModal();
        break;
    }
  }
}
