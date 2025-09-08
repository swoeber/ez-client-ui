import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabComponent, TabsComponent } from '../../components/tabs/tabs.component';
import { ProjectOverviewComponent } from './components/overview/project-overview.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';

@Component({
  selector: 'app-project.component',
  imports: [
    CommonModule,
    TabsComponent,
    ProjectOverviewComponent,
    TabComponent,
    MilestonesComponent,
    WorkOrderListComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  project$: Observable<Project> = new Observable<Project>();

  selectedIndex: number = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const projectId = +params['id']; // Convert the parameter to a number
      this.project$ = this.projectService.get(projectId);
    });
    this.route.queryParams.subscribe((params) => {
      if (params['tab'] && params['tab'] == 'workorders') {
        this.selectedIndex = 1;
      }
    });
  }
}
