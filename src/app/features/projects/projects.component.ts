import {Component, inject, OnInit} from '@angular/core';
import {
  ActionItem,
  DataTableComponent,
  TableColumn,
  TableOptions,
} from '../../shared/components/data-table/data-table.component';
import {Project, ProjectService} from '../../services/project.service';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectFormComponent} from '../project/components/form/project-form.component';

@Component({
  selector: 'app-project',
  imports: [DataTableComponent, CommonModule, ProjectFormComponent],
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

  projectColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Project Name', sortable: true},
    {key: 'percent_complete', label: '% Complete', sortable: true, type: 'percentage'},
  ];

  projectActions: ActionItem[] = [
    {label: 'View', action: 'view', icon: 'eye'},
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

  private loadProjects() {
    const clientId = this.route.snapshot.queryParams['client_id'];
    this.projects$ = this.projectService.all(clientId ? {client_id: clientId} : undefined);
  }
}
