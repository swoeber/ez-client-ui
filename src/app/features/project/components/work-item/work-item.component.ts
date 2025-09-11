import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { TabComponent, TabsComponent } from '../../../../components/tabs/tabs.component';
import { ReadableDatePipe } from '../../../../shared/pipes/readable-date.pipe';
import { WorkItem } from '../../../../services/work-item.service';
import { BreadcrumbsComponent, Crumb } from '../../../../shared/bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-work-item',
  imports: [
    FormsModule,
    CardComponent,
    TabComponent,
    TabsComponent,
    ReadableDatePipe,
    BreadcrumbsComponent,
  ],
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
})
export class WorkItemComponent {
  projectService: ProjectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  workItem = this.route.snapshot.data['workorder'];

  readonly crumbs: Crumb[] = (() => {
    return [
      {
        label: 'Project',
        url: ['/workspace/projects', this.workItem.project_id],
        query: { tab: 'workorders' },
      },
      { label: 'Work Order' },
    ];
  })();

  ngOnInit() {
    // this.workItem =
  }

  goBack() {
    this.router.navigate(['workspace/projects/', this.workItem.project_id]);
  }
}
