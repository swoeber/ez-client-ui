import { Component, inject, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableColumn,
  TableOptions,
} from '../../shared/components/data-table/data-table.component';
import { Project, ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService);

  projects$: Observable<Project[]> = new Observable<Project[]>();

  projectColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'percent_complete', label: '% Complete', sortable: true, type: 'percentage'},
  ];

  // Configure Client options
  tableOptions: TableOptions = {
    showSearch: true,
    showPagination: true,
    pageSize: 10,
    sortable: true, // Global sortable override
  };

  ngOnInit() {
    this.projects$ = this.projectService.all();
  }

  createProject() {}
}
