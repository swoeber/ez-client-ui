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

@Component({
  selector: 'app-project',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  projects$: Observable<Project[]> = new Observable<Project[]>();

  projectColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'name', label: 'Project Name', sortable: true},
    {key: 'percent_complete', label: '% Complete', sortable: true, type: 'percentage'},
  ];

  projectActions: ActionItem[] = [
    {label: 'View', action: 'view', icon: 'eye'},
    {label: 'Edit', action: 'edit', icon: 'pencil'},
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
    const clientId = this.route.snapshot.queryParams['client_id'];
    this.projects$ = this.projectService.all(clientId ? {client_id: clientId} : undefined);
  }

  createProject() {
  }

  onAction(event: { action: string, item: Project }) {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/workspace/projects/'+event.item.id]);
        break;
      case 'edit':
        console.log('Editing client:', event.item);
        break;
      case 'delete':
        console.log('Deleting client:', event.item);
        break;
    }
  }
}
