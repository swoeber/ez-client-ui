import {Component, inject} from '@angular/core';
import {Client, ClientService} from '../../services/client.service';
import {Observable} from 'rxjs';
import {
  TableColumn,
  DataTableComponent,
  TableOptions, ActionItem,
} from '../../shared/components/data-table/data-table.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clients.component',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  clientService: ClientService = inject(ClientService);
  router: Router = inject(Router);

  clients$: Observable<Client[]> = new Observable<Client[]>();

  clientColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Client Name', sortable: true},
    {key: 'first_name', label: 'First Name', sortable: true},
    {key: 'last_name', label: 'Last Name', sortable: true},
    {key: 'email', label: 'Email'},
  ];

  clientActions: ActionItem[] = [
    {label: 'View', action: 'view', icon: 'eye'},
    {label: 'View Projects', action: 'projects', icon: 'kanban'},
    {label: 'Edit', action: 'edit', icon: 'pencil'},
    {label: 'Delete', action: 'delete', icon: 'trash', disabled: (item) => item.status === 'active'}
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  ngOnInit() {
    this.clients$ = this.clientService.getClients();
  }

  onAction(event: { action: string, item: any }) {
    switch (event.action) {
      case 'view':
        console.log('Viewing client:', event.item);
        break;
      case 'projects':
        this.router.navigate(['/workspace/projects'], { queryParams: { client_id: event.item.id } });
        break;
      case 'edit':
        console.log('Editing client:', event.item);
        break;
      case 'delete':
        console.log('Deleting client:', event.item);
        break;
    }
  }
}
