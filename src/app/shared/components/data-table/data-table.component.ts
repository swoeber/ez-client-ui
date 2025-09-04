import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'date' | 'number' | 'currency' | 'percentage';
}

export interface TableOptions {
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() options: TableOptions = {};

  filteredData: any[] = [];
  searchTerm = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  ngOnInit() {
    this.pageSize = this.options.pageSize || 10;
    this.updateFilteredData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateFilteredData();
    }
  }

  private updateFilteredData() {
    this.filteredData = [...this.data];
    this.collectionSize = this.data.length;
    this.page = 1;
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter((item) =>
        this.columns.some((col) =>
          String(item[col.key]).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
    this.collectionSize = this.filteredData.length;
    this.page = 1;
  }

  onSort(column: TableColumn) {
    if (!column.sortable && !this.options.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      const aVal = a[column.key];
      const bVal = b[column.key];

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get paginatedData() {
    if (!this.options.showPagination) return this.filteredData;

    const start = (this.page - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  formatValue(value: any, type?: string): string {
    if (!value) return '';

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return new Intl.NumberFormat().format(value);
      case 'percentage':
        return new Intl.NumberFormat().format(value) + '%';
      default:
        return String(value);
    }
  }
}
