import { Component, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-invoices',
  imports: [DataTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  @Input() project: Project = {} as Project;

  invoiceColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'number', label: 'Invoice', sortable: true },
    { key: 'amount_cents', label: 'Amount#', type: 'currency' },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'due_on', label: 'Due On', sortable: true, type: 'date' },
  ];
}
