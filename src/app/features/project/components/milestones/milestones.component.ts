import {Component, Input} from '@angular/core';
import {Project} from '../../../../services/project.service';

@Component({
  selector: 'app-milestones',
  imports: [],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.scss'
})
export class MilestonesComponent {
  @Input() project: Project = {} as Project;
}
