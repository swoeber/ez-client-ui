// Example usage in any component:



// In your component:
import {TableColumn, TableOptions} from './data-table.component';

export class ExampleComponent {
  // Sample data
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1500, date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 2300, date: '2024-01-20' }
  ];

  // Define columns
  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
    { key: 'date', label: 'Date', sortable: true, type: 'date' }
  ];

  // Configure options
  tableOptions: TableOptions = {
    showSearch: false,
    showPagination: false,
    pageSize: 10,
    sortable: true // Global sortable override
  };
}

// In your template:
/*
<app-data-table
  [data]="tableData"
  [columns]="tableColumns"
  [options]="tableOptions">
</app-data-table>
*/
