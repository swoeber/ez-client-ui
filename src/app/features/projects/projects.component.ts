import {Component, inject, OnInit} from '@angular/core';
import {
  ActionItem,
  DataTableComponent,
  TableColumn,
  TableOptions,
} from '../../shared/components/data-table/data-table.component';
import {Project, ProjectService} from '../../services/project.service';
import {Observable} from 'rxjs';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectFormComponent} from '../project/components/form/project-form.component';

@Component({
  selector: 'app-project',
  imports: [DataTableComponent, CommonModule, ProjectFormComponent, TitleCasePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  projects$: Observable<Project[]> = new Observable<Project[]>();
  showForm = false;
  selectedProject?: Project;
  isEdit = false;
  showQuickView = false;
  quickViewProject?: Project;

  projectColumns: TableColumn[] = [
    {key: 'displayId', label: 'ID', sortable: true, clickable: true},
    {key: 'name', label: 'Project Name', sortable: true, clickable: true},
    {key: 'status', label: 'Status', sortable: true, type: 'badge'},
    {key: 'assignee.full_name', label: 'Assignee', sortable: true},
    {key: 'starts_on', label: 'Start Date', sortable: true, type: 'date'},
    {key: 'due_on', label: 'Due Date', sortable: true, type: 'date'},
    {key: 'created_at', label: 'Created', sortable: true, type: 'date'}
  ];

  projectActions: ActionItem[] = [
    {label: 'Quick View', action: 'quick-view', icon: 'eye-fill'},
    {label: 'View Details', action: 'view', icon: 'eye'},
    {label: 'Edit (Modal)', action: 'edit', icon: 'pencil'},
    {label: 'Edit (Page)', action: 'edit-page', icon: 'pencil-square'},
    {label: 'Delete', action: 'delete', icon: 'trash', disabled: (item) => item.status === 'active'}
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  ngOnInit() {
    this.loadProjects();
  }

  createProject() {
    this.selectedProject = undefined;
    this.isEdit = false;
    this.showForm = true;
  }

  createProjectPage() {
    this.router.navigate(['/workspace/projects/new']);
  }

  onAction(event: { action: string, item: Project }) {
    switch (event.action) {
      case 'quick-view':
        this.quickViewProject = event.item;
        this.showQuickView = true;
        break;
      case 'view':
        this.router.navigate(['/workspace/projects/'+event.item.id]);
        break;
      case 'edit':
        this.selectedProject = event.item;
        this.isEdit = true;
        this.showForm = true;
        break;
      case 'edit-page':
        this.router.navigate(['/workspace/projects', event.item.id, 'edit']);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this project?')) {
          console.log('Deleting project:', event.item);
        }
        break;
    }
  }

  onSaveProject(projectData: Partial<Project>) {
    console.log('Saving project:', projectData);
    // TODO: Implement save logic with ProjectService
    this.showForm = false;
    this.loadProjects();
  }

  onCancelForm() {
    this.showForm = false;
    this.selectedProject = undefined;
  }

  closeQuickView() {
    this.showQuickView = false;
    this.quickViewProject = undefined;
  }

  onColumnClick(event: { column: string, item: Project }) {
    if (event.column === 'name') {
      this.router.navigate(['/workspace/projects/' + event.item.id]);
    } else if (event.column === 'displayId') {
      this.router.navigate(['/workspace/projects/' + event.item.id]);
    }
  }

  private loadProjects() {
    const clientId = this.route.snapshot.queryParams['client_id'];
    this.projects$ = this.projectService.all(clientId ? {client_id: clientId} : undefined);
  }
}
