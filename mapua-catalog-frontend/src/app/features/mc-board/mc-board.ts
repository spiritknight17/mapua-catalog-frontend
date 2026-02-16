import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

// Frontend Interfaces
interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  postDate: Date;
  completionDate?: Date;
  deadlineDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
}

export type TaskStatus = 'todo' | 'in-progress' | 'to review' | 'on-hold' | 'completed';

// Backend Interface
interface TaskDto {
  id: number;
  title: string;
  description: string | null;
  postDate: string; // ISO string from backend
  completionDate: string; // ISO string
  deadlineDate: string; // ISO string
  priority: 'low' | 'medium' | 'high';
  status: string; // we'll normalize later
}

@Component({
  selector: 'app-mc-board',
  imports: [HeaderComponent, MainLabelComponent, CommonModule, CommonModule, DragDropModule],
  templateUrl: './mc-board.html',
  styleUrl: './mc-board.css',
})
export class McBoard implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  http = inject(HttpClient);

  //accessToken = localStorage.getItem('access_token');
  accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEZXJ2ZW4iLCJleHAiOjE3NzEyNTg5NzcsInR5cGUiOiJhY2Nlc3MifQ.7QmtC__GvuHKHPA8NhIAmk0UCZJzn6rMY3iHA9cdua8';

  tasks: Task[] = [];

  columns: Column[] = [
    { id: 'todo', title: 'To Do', color: '#E9A015', tasks: [] },
    { id: 'in-progress', title: 'In Progress', color: '#9A0000', tasks: [] },
    { id: 'to review', title: 'Review', color: '#5F0707', tasks: [] },
    { id: 'on-hold', title: 'On Hold', color: '#BC9595', tasks: [] },
    { id: 'completed', title: 'Completed', color: '#26B524', tasks: [] },
  ];

  // Action Buttons
  handleAction(actionId: string) {
    alert(`Action: ${actionId}`);
    switch (actionId) {
      case 'add-book':
        console.log(this.tasks);
        break;
    }
  }

  // Kanban Board Data Frontend

  // Kanban Board Backend (DTO)

  private mapToTask(dto: TaskDto): Task {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? undefined,
      postDate: new Date(dto.postDate),
      completionDate: dto.completionDate ? new Date(dto.completionDate) : undefined,
      deadlineDate: dto.deadlineDate ? new Date(dto.deadlineDate) : undefined,
      priority: dto.priority as 'low' | 'medium' | 'high',
      status: this.normalizeStatus(dto.status),
    };
  }

  private normalizeStatus(status: string): TaskStatus {
    switch (status.toLowerCase()) {
      case 'to do':
        return 'todo';
      case 'in progress':
        return 'in-progress';
      case 'to review':
        return 'to review';
      case 'on hold':
        return 'on-hold';
      case 'completed':
        return 'completed';
      default:
        return 'todo';
    }
  }

  // For drag and drop logic
  connectedDropLists: string[] = [];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log(this.columns);
  }
  trackByColumnId(index: number, column: Column) {
    return column.id;
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

  ngOnInit(): void {
    // Initialize drag-drop connections
    this.connectedDropLists = this.columns.map((c) => c.id);

    // Fetch tasks from backend
    this.http
      .get<TaskDto[]>('http://localhost:8000/rest/task/getTasks', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((data) => {
        // Map backend DTOs to frontend Task interface
        this.tasks = data.map((dto) => this.mapToTask(dto));

        // Assign tasks to columns
        this.columns.forEach((col) => {
          col.tasks = this.tasks.filter((t) => t.status === col.id);
        });

        console.log('Columns with tasks:', this.columns);

        // Force Angular to update view
        this.cdr.detectChanges();
      });
  }
}
