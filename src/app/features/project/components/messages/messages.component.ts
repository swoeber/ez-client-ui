import { Component, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  @Input() project: Project = {} as Project;
}
