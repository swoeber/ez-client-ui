import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, ProjectService} from '../../services/project.service';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CardComponent} from '../../shared/components/card/card.component';
import {TabComponent, TabsComponent} from '../../components/tabs/tabs.component';
import {ReadableDatePipe} from '../../shared/pipes/readable-date.pipe';

@Component({
  selector: 'app-workbench',
  imports: [
    AsyncPipe,
    FormsModule,
    CardComponent,
    TabComponent,
    TabsComponent,
    ReadableDatePipe,
  ],
  templateUrl: './workbench.component.html',
  styleUrl: './workbench.component.scss'
})
export class WorkbenchComponent implements OnInit{
  projectService: ProjectService = inject(ProjectService);

  project$: Observable<Project> = new Observable<Project>();


  ngOnInit() {
    this.project$ = this.projectService.get(1);
  }


}
