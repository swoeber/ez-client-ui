import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project, ProjectService } from '../../../../services/project.service';
import { User } from '../../../../store/user.store';
import { UserService } from '../../../../services/user.service';
import { Client, ClientService } from '../../../../services/client.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private clientService = inject(ClientService);
  private projectService = inject(ProjectService);

  @Input() project?: Project;
  @Input() isEdit = false;
  @Output() save = new EventEmitter<Partial<Project>>();
  @Output() cancel = new EventEmitter<void>();

  projectForm: FormGroup;
  users: User[] = [];
  clients: Client[] = [];
  showClientForm = false;
  clientForm: FormGroup;
  currentStep = 1;
  totalSteps = 3;

  statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'todo', label: 'To Do' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'en_route', label: 'En Route' },
    { value: 'on_site', label: 'On Site' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'waiting_on_parts', label: 'Waiting on Parts' },
    { value: 'awaiting_signature', label: 'Awaiting Signature' },
    { value: 'done', label: 'Done' },
    { value: 'waiting_on_client', label: 'Waiting on Client' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'canceled', label: 'Canceled' },
  ];

  constructor() {
    this.clientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      website: [''],
      notes: [''],
    });

    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['todo', Validators.required],
      starts_on: [''],
      due_on: [''],
      summary: [''],
      client_id: ['', Validators.required],
      assignee_id: [''],
      service_address_line1: [''],
      service_address_line2: [''],
      service_city: [''],
      service_state: [''],
      service_postal_code: [''],
      service_country: [''],
      service_place_name: [''],
      service_access_notes: [''],
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadClients();
    if (this.project) {
      this.projectForm.patchValue(this.project);
    }
  }

  loadUsers() {
    this.userService.getAccountMembers().subscribe((users) => {
      this.users = users;
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  toggleClientForm() {
    this.showClientForm = !this.showClientForm;
    if (!this.showClientForm) {
      this.clientForm.reset();
    }
  }

  getDateValue(timestamp: string | null | undefined): string {
    if (!timestamp) return '';
    return DateTime.fromISO(timestamp).toFormat('yyyy-MM-dd');
  }

  getTimeValue(timestamp: string | null | undefined): string {
    if (!timestamp) return '';
    return DateTime.fromISO(timestamp).toFormat('HH:mm');
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
    const currentTimestamp = this.project![field];
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

    if(field === 'due_on') {
      this.projectForm.patchValue({
        due_on: dt.toUTC().toISO(),
      });
    }

    if(field === 'starts_on') {
      this.projectForm.patchValue({
        starts_on: dt.toUTC().toISO(),
      });
    }
  }

  createClient() {
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe((newClient) => {
        this.clients.push(newClient);
        this.projectForm.patchValue({ client_id: newClient.id });
        this.showClientForm = false;
        this.clientForm.reset();
      });
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      // this.save.emit(this.projectForm.value);
      this.saveProject(this.projectForm.value);
    }
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.projectForm.get('name')?.valid && this.projectForm.get('status')?.valid);
      case 2:
        return !!this.projectForm.get('client_id')?.valid;
      case 3:
        return true;
      default:
        return false;
    }
  }

  saveProject(projectData: Partial<Project>) {
    console.log('Saving project:', projectData);
    // TODO: Implement save logic with ProjectService
    if (this.isEdit && this.project) {
      this.projectService.updateProject({ ...this.project, ...projectData }).subscribe({
        next: (project) => {
          this.save.emit(project);
        },
        error: (error) => {
          console.error('Error updating project:', error);
        },
      });
    } else {
      this.projectService.create(projectData).subscribe({
        next: (project) => {
          this.save.emit(project);
        },
        error: (error) => {
          console.error('Error creating project:', error);
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
