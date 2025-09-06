import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TabComponent, TabsComponent} from '../../components/tabs/tabs.component';
import {ProjectOverviewComponent} from './components/overview/project-overview.component';
import {MilestonesComponent} from './components/milestones/milestones.component';

@Component({
  selector: 'app-project.component',
  imports: [CommonModule, TabsComponent, ProjectOverviewComponent, TabComponent, MilestonesComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  project$: Observable<Project> = new Observable<Project>();
  //
  // tabs: TabItem[] = [
  //   {label: 'Overview', component: null},
  //   {label: 'Messages', component: null},
  //   {label: 'Milestones', component: null},
  //   {label: 'Files', component: null},
  //   {label: 'Invoices', component: null}
  // ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const projectId = +params['id']; // Convert the parameter to a number
      this.project$ = this.projectService.get(projectId);
    });
  }
}
