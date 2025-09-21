import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  ActionItem,
  TableColumn,
  TableOptions,
  DataTableComponent,
} from '../../shared/components/data-table/data-table.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../store/user.store';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [DataTableComponent, AsyncPipe, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  users$: Observable<User[]> = new Observable<User[]>();
  showViewModal = false;
  viewingClient: User | null = null;

  clientColumns: TableColumn[] = [
    { key: 'id', label: 'SysID', sortable: true, type: 'number' },
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'profile.title', label: 'Title', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'profile.is_active', label: 'Status', type: 'badge' },
  ];

  clientActions: ActionItem<User>[] = [
    { label: 'View', action: 'view', icon: 'eye' },
    { label: 'Edit', action: 'edit', icon: 'pencil' },
    {
      label: 'Delete',
      action: 'delete',
      icon: 'trash',
      disabled: (item) => (item as any).status === 'active',
    },
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  constructor() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getAccountMembers();
  }

  openAddModal() {
    this.router.navigate(['/workspace/users/new']);
  }

  openEdit(client: Partial<User>) {
    this.router.navigate(['/workspace/users', client.id, 'edit']);
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewingClient = null;
    this.cdr.markForCheck();
  }

  onAction(event: { action: string; item: User }) {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/workspace/users', event.item.id]);
        break;
      case 'edit':
        this.openEdit(event.item);
        break;
      case 'delete':
        // this.deleteClient(event.item);
        break;
    }
  }
}