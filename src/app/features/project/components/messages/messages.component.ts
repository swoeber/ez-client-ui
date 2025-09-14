import { Component, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';
import {ReadableDatePipe} from '../../../../shared/pipes/readable-date.pipe';

@Component({
  selector: 'app-messages',
  imports: [
    ReadableDatePipe
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  @Input() project: Project = {} as Project;
}
