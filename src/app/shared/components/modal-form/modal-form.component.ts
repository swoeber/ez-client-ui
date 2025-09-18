import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent {
  @Input() isVisible = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = 'bi-plus-circle';
  @Input() primaryButtonText = 'Save';
  @Input() secondaryButtonText = 'Cancel';
  @Input() isSubmitting = false;
  @Input() isValid = true;
  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';
  @Input() formContent!: TemplateRef<any>;

  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onPrimaryAction() {
    this.primaryAction.emit();
  }

  onSecondaryAction() {
    this.secondaryAction.emit();
  }

  onClose() {
    this.close.emit();
  }
}