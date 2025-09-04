import { Component, inject } from '@angular/core';
import { Client, ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';
import {
  TableColumn,
  DataTableComponent,
  TableOptions,
} from '../../shared/components/data-table/data-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients.component',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  clientService: ClientService = inject(ClientService);

  clients$: Observable<Client[]> = new Observable<Client[]>();

  clientColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Client Name', sortable: true },
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email' },
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
}
