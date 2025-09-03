import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {DataTableComponent, TableColumn, TableOptions} from '../../shared/components/data-table/data-table.component';
import {Client, ClientService} from '../../services/client.service';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    DataTableComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  clientService: ClientService = inject(ClientService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  done = 0

  clients$: Observable<Client[]> = new Observable<Client[]>();

  count: number = 0;

  // Define Client columns
  clientColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Client Name', sortable: true},
    {key: 'first_name', label: 'First Name', sortable: true},
    {key: 'last_name', label: 'Last Name', sortable: true},
    {key: 'email', label: 'Email'},
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: false,
    showPagination: false,
    pageSize: 10,
    sortable: true // Global sortable override
  };

  ngOnInit() {
    // this.loadClients();
    this.clients$ = this.clientService.getClients();
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

  increaseCount() {
    this.count++;
  }
}
