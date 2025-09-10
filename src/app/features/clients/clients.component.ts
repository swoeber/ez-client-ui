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

@Component({
  selector: 'app-clients.component',
  imports: [DataTableComponent, CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  clientService: ClientService = inject(ClientService);
  router: Router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  clients$: Observable<Client[]> = new Observable<Client[]>();
  showAddModal = false;
  newClient: Partial<Client> = {};
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

  closeAddModal() {
    console.log('closing modal');
    this.showAddModal = false;
    this.newClient = {};
    this.cdr.markForCheck();
  }

  onSubmitClient() {
    if (!this.newClient.first_name || !this.newClient.last_name || !this.newClient.email) {
      return;
    }

    this.isSubmitting = true;
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

  onAction(event: { action: string; item: any }) {
    switch (event.action) {
      case 'view':
        console.log('Viewing client:', event.item);
        break;
      case 'projects':
        this.router.navigate(['/workspace/projects'], {
          queryParams: { client_id: event.item.id },
        });
        break;
      case 'edit':
        console.log('Editing client:', event.item);
        break;
      case 'delete':
        this.deleteClient(event.item);
        break;
    }
  }
}
