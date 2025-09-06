import {Component, Input} from '@angular/core';
import {Project} from '../../../../services/project.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-milestones',
  imports: [
    JsonPipe
  ],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.scss'
})
export class MilestonesComponent {
  @Input() project: Project = {} as Project;
}
