import { Component, Input, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableColumn,
} from '../../../../shared/components/data-table/data-table.component';
import { Project } from '../../../../services/project.service';
import { ReadableDatePipe } from '../../../../shared/pipes/readable-date.pipe';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../store/user.store';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-overview',
  imports: [DataTableComponent, ReadableDatePipe, FormsModule, CommonModule, TitleCasePipe],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss',
})
export class ProjectOverviewComponent implements OnInit {
  @Input() project: Project = {} as Project;

  accountMembers: User[] = [];
  filteredMembers: User[] = [];
  assigneeSearch = '';
  showAssigneeDropdown = false;

  statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_site', label: 'On Site' },
    { value: 'done', label: 'Done' },
    { value: 'on_hold', label: 'On Hold' },
  ];

  invoiceColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'number', label: 'Invoice', sortable: true },
    { key: 'amount_cents', label: 'Amount#', type: 'currency' },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'due_on', label: 'Due On', sortable: true, type: 'date' },
  ];

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadAccountMembers();
  }

  loadAccountMembers() {
    this.userService.getAccountMembers().subscribe((members) => {
      this.accountMembers = members;
      this.filteredMembers = members;
    });
  }

  onAssigneeSearch() {
    this.filteredMembers = this.accountMembers.filter((member) =>
      member.full_name.toLowerCase().includes(this.assigneeSearch.toLowerCase())
    );
    this.showAssigneeDropdown = true;
  }

  selectAssignee(member: User) {
    this.project.assignee = member;
    this.assigneeSearch = member.full_name;
    this.showAssigneeDropdown = false;
  }

  onAssigneeFocus() {
    this.assigneeSearch = this.project.assignee?.full_name || '';
    this.filteredMembers = this.accountMembers;
    this.showAssigneeDropdown = true;
  }

  onAssigneeBlur() {
    setTimeout(() => (this.showAssigneeDropdown = false), 200);
  }

  onSignatureChange($event: any) {
    console.log('Signature changed:', $event);
  }

  getMapUrl(): SafeResourceUrl | null {
    const address = [this.project.service_address_line1, this.project.service_city, this.project.service_state].filter(Boolean).join(', ');
    if (address) {
      const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  }

  getGoogleMapsUrl(): string {
    const address = [this.project.service_address_line1, this.project.service_city, this.project.service_state].filter(Boolean).join(', ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
}
