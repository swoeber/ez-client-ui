import { Component, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';

@Component({
  selector: 'app-files',
  imports: [],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @Input() project: Project = {} as Project;
}
