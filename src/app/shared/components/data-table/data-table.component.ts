import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'date' | 'number' | 'currency' | 'percentage' | 'badge';
  clickable?: boolean;
}

export interface TableOptions {
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  sortable?: boolean;
}

export interface ActionItem {
  label: string;
  action: string;
  icon?: string;
  disabled?: (item: any) => boolean;
  showActions?: (item: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, TitleCasePipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() options: TableOptions = {};
  @Input() actions: ActionItem[] = [];
  @Output() actionClicked = new EventEmitter<{action: string, item: any}>();
  @Output() columnClicked = new EventEmitter<{column: string, item: any}>();

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
          String(this.getNestedValue(item, col.key) || '').toLowerCase().includes(this.searchTerm.toLowerCase())
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
      const aVal = this.getNestedValue(a, column.key);
      const bVal = this.getNestedValue(b, column.key);

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

  get hasActions(): boolean {
    return this.actions && this.actions.length > 0;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  formatValue(value: any, type?: string): string {
    if (!value) return '';

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return new Intl.NumberFormat().format(value);
      case 'percentage':
        return new Intl.NumberFormat().format(value) + '%';
      case 'badge':
        return String(value).replace('_', ' ');
      default:
        return String(value);
    }
  }

  getBadgeClass(value: any): string {
    const status = String(value).toLowerCase();
    switch (status) {
      case 'done':
      case 'completed':
        return 'bg-success';
      case 'in_progress':
      case 'active':
        return 'bg-primary';
      case 'on_hold':
      case 'paused':
        return 'bg-warning';
      case 'canceled':
      case 'cancelled':
      case 'blocked':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  onActionClick(action: string, item: any) {
    this.actionClicked.emit({ action, item });
  }

  isActionDisabled(actionItem: ActionItem, item: any): boolean {
    return actionItem.disabled?.(item) ?? false;
  }

  shouldShowActions(item: any): boolean {
    return this.actions.some(action => !action.showActions || action.showActions(item));
  }

  onColumnClick(column: TableColumn, item: any) {
    if (column.clickable) {
      this.columnClicked.emit({ column: column.key, item });
    }
  }
}
