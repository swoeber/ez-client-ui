import { Component, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [JsonPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input() project: Project = {} as Project;
}
