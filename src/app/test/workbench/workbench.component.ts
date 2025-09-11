import { Component, inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { TabComponent, TabsComponent } from '../../components/tabs/tabs.component';
import { ReadableDatePipe } from '../../shared/pipes/readable-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkItem } from '../../services/work-item.service';

@Component({
  selector: 'app-workbench',
  imports: [AsyncPipe, FormsModule, CardComponent, TabComponent, TabsComponent, ReadableDatePipe],
  templateUrl: './workbench.component.html',
  styleUrl: './workbench.component.scss',
})
export class WorkbenchComponent implements OnInit {
  projectService: ProjectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  workItem$: Observable<WorkItem> = new Observable<WorkItem>();

  ngOnInit() {
    const workOrderId = Number(this.route.snapshot.paramMap.get('id'));
    this.workItem$ = this.projectService
      .get(1)
      .pipe(map((project) => project.workitems.find((item) => item.id === workOrderId)!));
  }

  goBack() {
    this.router.navigate(['/work-items']);
  }
}
