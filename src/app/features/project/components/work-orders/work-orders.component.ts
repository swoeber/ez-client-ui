import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CardComponent} from "../../../../shared/components/card/card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ReadableDatePipe} from "../../../../shared/pipes/readable-date.pipe";
import {TabComponent, TabsComponent} from "../../../../components/tabs/tabs.component";

@Component({
  selector: 'app-work-order',
    imports: [
        AsyncPipe,
        CardComponent,
        ReactiveFormsModule,
        ReadableDatePipe,
        TabComponent,
        TabsComponent
    ],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.scss'
})
export class WorkOrdersComponent {

}
