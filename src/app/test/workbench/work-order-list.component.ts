import {Component, inject, Input} from '@angular/core';
import {Project} from '../../services/project.service';
import {TitleCasePipe} from '@angular/common';
import {ReadableDatePipe} from '../../shared/pipes/readable-date.pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    ReadableDatePipe
  ],
  templateUrl: './work-order-list.component.html',
  styleUrl: './work-order-list.component.scss'
})
export class WorkOrderListComponent {
  @Input() project: Project = {} as Project;
  router = inject(Router);

  openWorkOrder(workOrderId: number) {
    this.router.navigate(['/workbench', workOrderId]);
  }
}
