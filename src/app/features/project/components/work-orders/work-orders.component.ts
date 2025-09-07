import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-work-order',
    imports: [
        ReactiveFormsModule,
    ],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss'
})
export class WorkOrdersComponent {

}
