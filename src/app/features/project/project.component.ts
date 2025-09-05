import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CardComponent} from '../../shared/components/card/card.component';

@Component({
  selector: 'app-project.component',
  imports: [CommonModule, CardComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  project$: Observable<Project> = new Observable<Project>();

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = +params['id']; // Convert the parameter to a number
      this.project$ = this.projectService.get(projectId);
    });
  }

}
