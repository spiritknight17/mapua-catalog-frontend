import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  type: string;
  user: string;
}

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-card.html',
  styleUrls: ['./kanban-card.css'],
})
export class KanbanCard {
  @Input() title!: string;
  @Input() tasksRemaining!: number;
  @Input() collection!: string;
  @Input() year!: number;
  @Input() borderColor: string = '#007bff';
  @Input() avatars: string[] = [];
  @Input() tasks: Task[] = [];

  /** Track toggle state */
  isExpanded = false;

  toggleTasks() {
    this.isExpanded = !this.isExpanded;
  }

  addTask() {
    console.log('Add task clicked');
  }
}
