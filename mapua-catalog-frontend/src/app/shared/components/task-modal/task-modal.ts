// task-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../features/mc-board/mc-board';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.html',
  styleUrls: ['./task-modal.css'],
  imports: [CommonModule, FormsModule],
})
export class TaskModalComponent {
  /** Mode: 'add' | 'view' | 'update' */
  @Input() mode: 'add' | 'view' | 'edit' = 'add';

  /** The task being viewed or edited */
  @Input() task: Task | null = null;

  /** Emits the updated task on save */
  @Output() save = new EventEmitter<Task>();

  /** Close modal signal */
  @Output() close = new EventEmitter<void>();

  @Output() modeChange = new EventEmitter<'add' | 'view' | 'edit'>();

  originalTask: Task | null = null;

  /** Local copy for editing */
  editableTask: Task = {
    id: 0,
    title: '',
    description: '',
    postDate: new Date(),
    priority: 'low',
    status: 'todo',
  };

  ngOnChanges() {
    if (this.task) {
      this.editableTask = { ...this.task };
      this.originalTask = { ...this.task };
    } else if (this.mode === 'add') {
      this.editableTask = {
        id: 0,
        title: '',
        description: '',
        postDate: new Date(),
        priority: 'low',
        status: 'todo',
      };

      this.originalTask = null;
    }
  }

  onSave() {
    this.save.emit(this.editableTask);
    console.log('Emitted task:', this.editableTask);
  }

  onClose() {
    if (this.mode === 'edit' && this.originalTask) {
      const hasChanges =
        this.originalTask.title !== this.editableTask.title ||
        this.originalTask.description !== this.editableTask.description ||
        this.originalTask.priority !== this.editableTask.priority ||
        this.originalTask.status !== this.editableTask.status ||
        this.compareDates(this.originalTask.deadlineDate, this.editableTask.deadlineDate) === false;

      if (hasChanges) {
        const confirmClose = confirm('You have unsaved changes. Discard them?');

        if (!confirmClose) return;
      }
    }

    this.close.emit();
  }

  private compareDates(date1?: Date, date2?: Date): boolean {
    if (!date1 && !date2) return true;
    if (!date1 || !date2) return false;
    return date1.getTime() === date2.getTime();
  }

  onDeadlineChange(value: string) {
    this.editableTask.deadlineDate = value ? new Date(value) : undefined;
  }
}
