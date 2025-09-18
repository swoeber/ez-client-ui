import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkItem } from '../../../../services/work-item.service';

@Component({
  selector: 'app-work-item-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-item-modal.component.html',
  styleUrl: './work-item-modal.component.scss'
})
export class WorkItemModalComponent {
  @Input() workItem: WorkItem | null = null;
  @Input() newWorkItem: Partial<WorkItem> | null = null;
  @Input() workItemTypes: any[] = [];
  @Input() isVisible = false;
  
  @Output() save = new EventEmitter<WorkItem | Partial<WorkItem>>();
  @Output() cancel = new EventEmitter<void>();
  @Output() typeChange = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<void>();
  @Output() removeTask = new EventEmitter<number>();

  get isEditing(): boolean {
    return !!this.workItem;
  }

  get currentItem(): WorkItem | Partial<WorkItem> {
    return this.workItem || this.newWorkItem || {};
  }

  onSubmit() {
    this.save.emit(this.currentItem);
  }

  onCancel() {
    this.cancel.emit();
  }

  onTypeChange() {
    if (!this.isEditing) {
      this.typeChange.emit();
    }
  }

  onAddTask() {
    this.addTask.emit();
  }

  onRemoveTask(index: number) {
    this.removeTask.emit(index);
  }
}