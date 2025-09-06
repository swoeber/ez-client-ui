import {Component, Input} from '@angular/core';
import {CardComponent} from "../../../../shared/components/card/card.component";
import {DataTableComponent, TableColumn} from "../../../../shared/components/data-table/data-table.component";
import {Project} from '../../../../services/project.service';
import {ReadableDatePipe} from '../../../../shared/pipes/readable-date.pipe';

@Component({
  selector: 'app-project-overview',
  imports: [
    CardComponent,
    DataTableComponent,
    ReadableDatePipe,
  ],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss'
})
export class ProjectOverviewComponent {
  @Input() project: Project = {} as Project;

  invoiceColumns: TableColumn[] = [
    {key: 'id', label: 'ID', sortable: true, type: 'number'},
    {key: 'number', label: 'Invoice', sortable: true},
    {key: 'amount_cents', label: 'Amount#', type: 'currency'},
    {key: 'status', label: 'Status', sortable: true},
    {key: 'due_on', label: 'Due On', sortable: true, type: 'date'},
  ];
}
