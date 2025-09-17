import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project, ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabComponent, TabsComponent } from '../../components/tabs/tabs.component';
import { ProjectOverviewComponent } from './components/overview/project-overview.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { WorkItemListComponent } from './components/work-item-list/work-item-list.component';
import { InvoicesComponent } from './components/invoice/invoices.component';
import { FilesComponent } from './components/files/files.component';

@Component({
  selector: 'app-project.component',
  imports: [
    CommonModule,
    TabsComponent,
    ProjectOverviewComponent,
    TabComponent,
    MilestonesComponent,
    WorkItemListComponent,
    InvoicesComponent,
    FilesComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  private projectSubject = new BehaviorSubject<Project>({} as Project);
  project$ = this.projectSubject.asObservable();

  @ViewChild(ProjectOverviewComponent) overviewComponent!: ProjectOverviewComponent;
  selectedIndex: number = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      this.projectService.get(projectId).subscribe((project) => {
        this.projectSubject.next(project);
      });
    });
    this.route.queryParams.subscribe((params) => {
      if (params['tab'] && params['tab'] == 'workorders') {
        this.selectedIndex = 1;
      }
    });
  }

  onProjectUpdated(updatedProject: Partial<Project>) {
    const currentProject = this.projectSubject.value;
    const mergedProject = { ...currentProject, ...updatedProject };
    this.projectSubject.next(mergedProject);
    
    // Refresh overview metrics if workitems were updated
    if (updatedProject.work_items && this.overviewComponent) {
      this.overviewComponent.refreshMetrics();
    }
  }

  onWorkItemsUpdated() {
    // Reload the full project to get updated workitems
    const projectId = this.projectSubject.value.id;
    if (projectId) {
      this.projectService.get(projectId).subscribe((project) => {
        this.projectSubject.next(project);
        if (this.overviewComponent) {
          this.overviewComponent.refreshMetrics();
        }
      });
    }
  }
}
