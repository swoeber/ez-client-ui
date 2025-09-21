import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

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

export interface ActionItem<T = unknown> {
  label: string;
  action: string;
  icon?: string;
  disabled?: (item: T) => boolean;
  showActions?: (item: T) => boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, TitleCasePipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T = unknown> implements OnInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() options: TableOptions = {};
  @Input() actions: ActionItem<T>[] = [];
  @Output() actionClicked = new EventEmitter<{action: string, item: T}>();
  @Output() columnClicked = new EventEmitter<{column: string, item: T}>();

  filteredData: T[] = [];
  searchTerm = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  Math = Math;

  private searchSubject = new Subject<string>();
  private static currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  private static numberFormatter = new Intl.NumberFormat();
  private static dateFormatter = new Intl.DateTimeFormat();

  ngOnInit() {
    this.pageSize = this.options.pageSize || 10;
    this.updateFilteredData();
    
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.performSearch(term);
    });
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
    this.searchSubject.next(this.searchTerm);
  }

  private performSearch(term: string) {
    if (!term) {
      this.filteredData = [...this.data];
    } else {
      const lowerTerm = term.toLowerCase();
      this.filteredData = this.data.filter((item) =>
        this.columns.some((col) => {
          const value = this.getNestedValue(item, col.key);
          return value && String(value).toLowerCase().includes(lowerTerm);
        })
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

      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return this.sortDirection === 'asc' ? -1 : 1;
      if (bVal == null) return this.sortDirection === 'asc' ? 1 : -1;

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

  getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce((current, key) => (current as any)?.[key], obj);
  }

  getItemId(item: T, index: number): string {
    const id = this.getNestedValue(item, 'id');
    return id ? String(id) : String(index);
  }

  formatValue(value: unknown, type?: string): string {
    if (value == null) return '';

    try {
      switch (type) {
        case 'currency':
          const numValue = typeof value === 'string' ? parseFloat(value) : value as number;
          return DataTableComponent.currencyFormatter.format(numValue / 100);
        case 'date':
          const date = new Date(value as string | number | Date);
          if (isNaN(date.getTime())) return String(value);
          return date.toLocaleDateString();
        case 'number':
          return DataTableComponent.numberFormatter.format(value as number);
        case 'percentage':
          return DataTableComponent.numberFormatter.format(value as number) + '%';
        case 'badge':
          return String(value).replace('_', ' ');
        default:
          return String(value);
      }
    } catch (error) {
      return String(value);
    }
  }

  getBadgeClass(value: unknown): string {
    if (value == null) return 'bg-secondary';
    
    const status = String(value).toLowerCase();
    switch (status) {
      case 'done':
      case 'completed':
      case 'active':
      case 'true':
        return 'bg-success';
      case 'in_progress':
      case 'pending':
        return 'bg-primary';
      case 'on_hold':
      case 'paused':
        return 'bg-warning';
      case 'canceled':
      case 'cancelled':
      case 'blocked':
      case 'false':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  onActionClick(action: string, item: T) {
    this.actionClicked.emit({ action, item });
  }

  isActionDisabled(actionItem: ActionItem<T>, item: T): boolean {
    return actionItem.disabled?.(item) ?? false;
  }

  hasVisibleActions(item: T): boolean {
    return this.actions.some(action => !action.showActions || action.showActions(item));
  }

  onColumnClick(column: TableColumn, item: T) {
    if (column.clickable) {
      this.columnClicked.emit({ column: column.key, item });
    }
  }
}