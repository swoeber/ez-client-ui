import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../../services/project.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkItem, WorkItemService } from '../../../../services/work-item.service';
import { FormsModule } from '@angular/forms';
import { ModalFormComponent } from '../../../../shared/components/modal-form/modal-form.component';

@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalFormComponent],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.scss',
})
export class WorkItemListComponent implements OnInit {
  @Input() project: Project = {} as Project;
  @Output() workItemsChanged = new EventEmitter<void>();
  router = inject(Router);
  workItemService = inject(WorkItemService);

  workItems: WorkItem[] = [];
  showCreateForm = false;
  expandedItems: Set<number> = new Set();
  editingItems: Set<number> = new Set();
  editingWorkItem: WorkItem | null = null;
  signatureData: Map<number, string> = new Map();
  uploadingImages: Set<number> = new Set();
  newWorkItem: Partial<WorkItem> = {
    title: '',
    description: '',
    type: 'standard',
    completed: false,
    require_photos: false,
    completion_required: true,
    tasks: [],
  };

  workItemTypes = [
    { value: 'standard', label: 'Standard', description: 'Basic work item with standard info' },
    { value: 'task_list', label: 'Task List', description: 'Work item with a list of tasks' },
    { value: 'signature', label: 'Signature', description: 'Requires signature to complete' },
  ];

  ngOnInit() {
    this.loadWorkItems();
  }

  loadWorkItems() {
    if (this.project.id) {
      this.workItemService.list(this.project.id).subscribe({
        next: (items) => {
          this.workItems = items;
        },
        error: (error) => {
          console.error('Error loading work items:', error);
        },
      });
    }
  }

  toggleWorkItem(workItemId: number) {
    if (this.expandedItems.has(workItemId)) {
      this.expandedItems.delete(workItemId);
    } else {
      this.expandedItems.add(workItemId);
    }
  }

  isExpanded(workItemId: number): boolean {
    return this.expandedItems.has(workItemId);
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newWorkItem = {
      title: '',
      description: '',
      type: 'standard',
      completed: false,
      require_photos: false,
      completion_required: true,
      tasks: [],
    };
  }

  onTypeChange() {
    if (this.newWorkItem.type === 'task_list') {
      this.newWorkItem.tasks = [{ title: '', completed: false } as any];
    } else {
      this.newWorkItem.tasks = [];
    }
  }

  addTask() {
    if (this.newWorkItem.tasks) {
      this.newWorkItem.tasks.push({ title: '', completed: false } as any);
    }
  }

  removeTask(index: number) {
    if (this.newWorkItem.tasks) {
      this.newWorkItem.tasks.splice(index, 1);
    }
  }

  createWorkItem() {
    if (!this.newWorkItem.title?.trim()) {
      return;
    }

    this.workItemService.create(this.project.id, this.newWorkItem).subscribe({
      next: (workItem) => {
        this.workItems.push(workItem);
        this.toggleCreateForm();
        this.workItemsChanged.emit();
      },
      error: (error) => {
        console.error('Error creating work item:', error);
      },
    });
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'signature':
        return 'bi-pen';
      case 'task_list':
        return 'bi-list-check';
      default:
        return 'bi-clipboard';
    }
  }

  getTypeLabel(type: string): string {
    const typeObj = this.workItemTypes.find((t) => t.value === type);
    return typeObj?.label || 'Standard';
  }

  getCompletedTasksCount(tasks: any[]): number {
    return tasks.filter((task) => task.completed).length;
  }

  toggleTaskCompletion(workItem: WorkItem, taskIndex: number) {
    if (workItem.tasks && workItem.tasks[taskIndex]) {
      workItem.tasks[taskIndex].completed = !workItem.tasks[taskIndex].completed;
      this.updateWorkItemCompletion(workItem);
      this.updateWorkItem(workItem);
    }
  }

  toggleWorkItemCompletion(workItem: WorkItem) {
    workItem.completed = !workItem.completed;
    this.updateWorkItem({ completed: workItem.completed, id: workItem.id });
  }

  private updateWorkItemCompletion(workItem: WorkItem) {
    if (workItem.type === 'task_list' && workItem.tasks) {
      const completedTasks = this.getCompletedTasksCount(workItem.tasks);
      workItem.completed = completedTasks === workItem.tasks.length && workItem.tasks.length > 0;
    }
  }

  private updateWorkItem(workItem: Partial<WorkItem>) {
    this.workItemService.update(this.project.id, workItem.id!, workItem).subscribe({
      next: (updatedItem) => {
        const index = this.workItems.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          this.workItems[index] = updatedItem;
        }
        this.workItemsChanged.emit();
      },
      error: (error) => {
        console.error('Error updating work item:', error);
      },
    });
  }

  onSignatureChange(workItem: WorkItem, signatureData: string) {
    this.signatureData.set(workItem.id, signatureData);
  }

  submitSignature(workItem: WorkItem) {
    const signature = this.signatureData.get(workItem.id);
    if (signature) {
      workItem.completed = true;
      this.updateWorkItem(workItem);
      this.signatureData.delete(workItem.id);
    }
  }

  clearSignature(workItem: WorkItem) {
    this.signatureData.delete(workItem.id);
  }

  hasSignature(workItem: WorkItem): boolean {
    return this.signatureData.has(workItem.id) && !!this.signatureData.get(workItem.id);
  }

  startEditing(workItemId: number) {
    const item = this.workItems.find((wi) => wi.id === workItemId);
    if (item) {
      this.editingWorkItem = { ...item, tasks: item.tasks ? [...item.tasks] : [] };
      this.editingItems.add(workItemId);
    }
  }

  stopEditing(workItemId: number) {
    this.editingItems.delete(workItemId);
    this.editingWorkItem = null;
  }

  isEditing(workItemId: number): boolean {
    return this.editingItems.has(workItemId);
  }

  saveWorkItem(workItem: WorkItem) {
    if (this.editingWorkItem) {
      this.updateWorkItem(this.editingWorkItem);
      this.stopEditing(workItem.id);
    }
  }

  addTaskToWorkItem(workItem: WorkItem) {
    if (this.editingWorkItem && this.editingWorkItem.id === workItem.id) {
      if (!this.editingWorkItem.tasks) {
        this.editingWorkItem.tasks = [];
      }
      this.editingWorkItem.tasks.push({ title: 'New task', completed: false } as any);
    }
  }

  removeTaskFromWorkItem(workItem: WorkItem, taskIndex: number) {
    if (
      this.editingWorkItem &&
      this.editingWorkItem.id === workItem.id &&
      this.editingWorkItem.tasks
    ) {
      this.editingWorkItem.tasks.splice(taskIndex, 1);
    }
  }

  deleteWorkItem(workItem: WorkItem) {
    if (confirm('Are you sure you want to delete this work item?')) {
      this.workItemService.delete(this.project.id, workItem.id).subscribe({
        next: () => {
          this.workItems = this.workItems.filter((item) => item.id !== workItem.id);
          this.workItemsChanged.emit();
        },
        error: (error) => {
          console.error('Error deleting work item:', error);
        },
      });
    }
  }

  onImageUpload(workItem: WorkItem, event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.uploadingImages.add(workItem.id);

      const formData = new FormData();
      formData.append('image', file);

      this.workItemService.uploadImage(this.project.id, workItem.id, formData).subscribe({
        next: (response) => {
          // Update work item with image URL
          const updatedItem = { ...workItem, image_url: response.image_url };
          const index = this.workItems.findIndex((item) => item.id === workItem.id);
          if (index !== -1) {
            this.workItems[index] = updatedItem;
          }
          this.uploadingImages.delete(workItem.id);
          this.workItemsChanged.emit();
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.uploadingImages.delete(workItem.id);
        },
      });
    }
  }

  isUploadingImage(workItemId: number): boolean {
    return this.uploadingImages.has(workItemId);
  }

  removeImage(workItem: WorkItem) {
    if (confirm('Are you sure you want to remove this image?')) {
      this.workItemService.removeImage(this.project.id, workItem.id).subscribe({
        next: () => {
          const updatedItem = { ...workItem, image_url: undefined };
          const index = this.workItems.findIndex((item) => item.id === workItem.id);
          if (index !== -1) {
            this.workItems[index] = updatedItem;
          }
          this.workItemsChanged.emit();
        },
        error: (error) => {
          console.error('Error removing image:', error);
        },
      });
    }
  }

  onModalSave() {
    if (this.editingWorkItem) {
      this.updateWorkItem(this.editingWorkItem);
      this.stopEditing(this.editingWorkItem.id);
    } else {
      this.createWorkItem();
    }
  }

  onModalCancel() {
    if (this.editingWorkItem) {
      this.stopEditing(this.editingWorkItem.id);
    } else {
      this.toggleCreateForm();
    }
  }

  onModalAddTask() {
    if (this.editingWorkItem) {
      this.addTaskToWorkItem(this.editingWorkItem);
    } else {
      this.addTask();
    }
  }

  onModalRemoveTask(index: number) {
    if (this.editingWorkItem) {
      this.removeTaskFromWorkItem(this.editingWorkItem, index);
    } else {
      this.removeTask(index);
    }
  }

  isFormValid(): boolean {
    const currentItem = this.editingWorkItem || this.newWorkItem;
    return !!(currentItem.title && currentItem.title.trim());
  }

  getCurrentItem(): WorkItem | Partial<WorkItem> {
    return this.editingWorkItem || this.newWorkItem;
  }

  getWorkItemMetrics() {
    const total = this.workItems.length;
    const completed = this.workItems.filter((item) => item.completed).length;
    const pending = total - completed;
    const byType = {
      standard: this.workItems.filter((item) => item.type === 'standard').length,
      task_list: this.workItems.filter((item) => item.type === 'task_list').length,
      signature: this.workItems.filter((item) => item.type === 'signature').length,
    };

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      byType,
    };
  }
}
