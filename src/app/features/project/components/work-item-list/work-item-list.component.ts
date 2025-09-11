import { Component, inject, Input } from '@angular/core';
import { Project } from '../../../../services/project.service';
import { TitleCasePipe } from '@angular/common';
import { ReadableDatePipe } from '../../../../shared/pipes/readable-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [TitleCasePipe, ReadableDatePipe],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.scss',
})
export class WorkItemListComponent {
  @Input() project: Project = {} as Project;
  router = inject(Router);

  openWorkOrder(workItemId: number) {
    this.router.navigate(['workspace/projects', this.project.id, 'workitem', workItemId]);
  }
}
