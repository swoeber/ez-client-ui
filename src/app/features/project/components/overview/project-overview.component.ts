import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { Project, ProjectService } from '../../../../services/project.service';
import { ReadableDatePipe } from '../../../../shared/pipes/readable-date.pipe';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../store/user.store';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '../location/location.component';
import { DateTime } from 'luxon';
import { MessagesComponent } from '../messages/messages.component';
import { WorkItemService } from '../../../../services/work-item.service';

@Component({
  selector: 'app-project-overview',
  imports: [ReadableDatePipe, FormsModule, CommonModule, LocationComponent, MessagesComponent],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss',
})
export class ProjectOverviewComponent implements OnInit, OnChanges {
  userService: UserService = inject(UserService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  projectService: ProjectService = inject(ProjectService);
  workItemService: WorkItemService = inject(WorkItemService);

  @Input() project: Project = {} as Project;
  @Output() projectUpdated = new EventEmitter<Project>();

  projectStage: Project = {} as Project;
  accountMembers: User[] = [];
  filteredMembers: User[] = [];
  assigneeSearch = '';
  showAssigneeDropdown = false;
  editingField: string | null = null;
  workItemMetrics: any = null;

  statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_site', label: 'On Site' },
    { value: 'done', label: 'Done' },
    { value: 'on_hold', label: 'On Hold' },
  ];

  ngOnInit() {
    this.loadAccountMembers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      if (this.accountMembers.length > 0) {
        this.setInitialAssignee();
      }
      if (this.project.id) {
        this.loadWorkItemMetrics();
      }
    }
  }

  loadAccountMembers() {
    this.userService.getAccountMembers().subscribe((members) => {
      this.accountMembers = members;
      this.filteredMembers = members;
      this.setInitialAssignee();
    });
  }

  private setInitialAssignee() {
    if (this.project.assignee_id) {
      const assignee = this.accountMembers.find((member) => member.id === this.project.assignee_id);
      if (assignee) {
        this.project.assignee = assignee;
        this.assigneeSearch = assignee.full_name;
        this.cdr.detectChanges();
      }
    }
  }

  onAssigneeSearch() {
    this.filteredMembers = this.accountMembers.filter((member) =>
      member.full_name.toLowerCase().includes(this.assigneeSearch.toLowerCase())
    );
    this.showAssigneeDropdown = true;
  }

  selectAssignee(member: User) {
    this.project.assignee = member;
    this.project.assignee_id = member.id;
    this.assigneeSearch = member.full_name;
    this.showAssigneeDropdown = false;
    this.updateProject();
  }

  onAssigneeFocus() {
    if (!this.assigneeSearch && this.project.assignee) {
      this.assigneeSearch = this.project.assignee.full_name;
    }
    this.filteredMembers = this.accountMembers;
    this.showAssigneeDropdown = true;
  }

  onAssigneeBlur() {
    setTimeout(() => (this.showAssigneeDropdown = false), 200);
  }

  startEditing(field: string) {
    this.editingField = field;
  }

  stopEditing() {
    this.editingField = null;
  }

  isEditing(field: string): boolean {
    return this.editingField === field;
  }

  getStatusLabel(): string {
    const option = this.statusOptions.find((opt) => opt.value === this.project.status);
    return option?.label || 'Select status';
  }

  onStatusChange() {
    this.updateProject();
  }

  getDateValue(timestamp: string | null | undefined): string {
    if (!timestamp) return '';
    return DateTime.fromISO(timestamp).toFormat('yyyy-MM-dd');
  }

  getTimeValue(timestamp: string | null | undefined): string {
    if (!timestamp) return '';
    return DateTime.fromISO(timestamp).toFormat('HH:mm');
  }

  getDateTime(timestamp: string | null | undefined): string {
    if (!timestamp) return '';
    return DateTime.fromISO(timestamp).toFormat('yyyy-MM-dd h:mm a');
  }

  onStartDateBlur(event: any) {
    this.updateDateTime('starts_on', event.target.value, null);
  }

  onStartTimeBlur(event: any) {
    this.updateDateTime('starts_on', null, event.target.value);
  }

  onDueDateBlur(event: any) {
    this.updateDateTime('due_on', event.target.value, null);
  }

  onDueTimeBlur(event: any) {
    this.updateDateTime('due_on', null, event.target.value);
  }

  private updateDateTime(
    field: 'starts_on' | 'due_on',
    newDate: string | null,
    newTime: string | null
  ) {
    const currentTimestamp = this.project[field];
    let dt: DateTime;

    if (currentTimestamp) {
      dt = DateTime.fromISO(currentTimestamp);
    } else {
      dt = DateTime.now();
    }

    if (newDate !== null) {
      const [year, month, day] = newDate.split('-').map(Number);
      dt = dt.set({ year, month, day });
    }

    if (newTime !== null) {
      const [hour, minute] = newTime.split(':').map(Number);
      dt = dt.set({ hour, minute, second: 0, millisecond: 0 });
    }

    this.projectStage[field] = dt.toUTC().toISO();
  }

  public updateDueTimestamp() {
    if (this.projectStage['due_on']) {
      this.project['due_on'] = this.projectStage['due_on'];
      this.updateProject();
    }
    this.stopEditing();
  }

  public updateStartTimestamp() {
    if (this.projectStage['starts_on']) {
      this.project['starts_on'] = this.projectStage['starts_on'];
      this.updateProject();
    }
    this.stopEditing();
  }

  private updateProject() {
    this.projectService.updateProject(this.project).subscribe({
      next: (updatedProject: Project) => {
        this.projectUpdated.emit(updatedProject);
      },
      error: (error: any) => {
        console.error('Error updating project:', error);
      },
    });
  }

  private loadWorkItemMetrics() {
    if (this.project.work_items) {
      this.calculateMetrics(this.project.work_items);
    }
  }

  private calculateMetrics(workItems: any[]) {
    const total = workItems.length;
    const completed = workItems.filter(item => item.completed).length;
    const pending = total - completed;
    const byType = {
      standard: workItems.filter(item => item.type === 'standard').length,
      task_list: workItems.filter(item => item.type === 'task_list').length,
      signature: workItems.filter(item => item.type === 'signature').length
    };
    
    this.workItemMetrics = { 
      total, 
      completed, 
      pending, 
      completionRate: total > 0 ? (completed / total) * 100 : 0, 
      byType 
    };
  }

  refreshMetrics() {
    if (this.project.work_items) {
      this.calculateMetrics(this.project.work_items);
    }
  }
}
