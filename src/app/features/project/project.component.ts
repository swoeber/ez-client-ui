import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-project.component',
  imports: [CommonModule, CardComponent, DataTableComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  project$: Observable<Project> = new Observable<Project>();

  invoiceColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'number', label: 'Invoice', sortable: true },
    { key: 'amount_cents', label: 'Amount#', type: 'currency' },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'due_on', label: 'Due On', sortable: true, type: 'date' },
  ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const projectId = +params['id']; // Convert the parameter to a number
      this.project$ = this.projectService.get(projectId);
    });
  }
}
