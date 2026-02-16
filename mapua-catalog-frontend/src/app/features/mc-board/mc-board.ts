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
import { FormsModule } from '@angular/forms';

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

export type TaskStatus = 'todo' | 'in-progress' | 'to review' | 'on-hold' | 'completed' | 'bin';

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
  imports: [
    HeaderComponent,
    MainLabelComponent,
    CommonModule,
    CommonModule,
    FormsModule,
    DragDropModule,
  ],
  templateUrl: './mc-board.html',
  styleUrl: './mc-board.css',
})
export class McBoard implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  http = inject(HttpClient);

  accessToken = localStorage.getItem('access_token');
  //accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEZXJ2ZW4iLCJleHAiOjE3NzEyNTg5NzcsInR5cGUiOiJhY2Nlc3MifQ.7QmtC__GvuHKHPA8NhIAmk0UCZJzn6rMY3iHA9cdua8';

  tasks: Task[] = [];

  columns: Column[] = [
    { id: 'todo', title: 'To Do', color: '#E9A015', tasks: [] },
    { id: 'in-progress', title: 'In Progress', color: '#9A0000', tasks: [] },
    { id: 'to review', title: 'Review', color: '#5F0707', tasks: [] },
    { id: 'on-hold', title: 'On Hold', color: '#BC9595', tasks: [] },
    { id: 'completed', title: 'Completed', color: '#26B524', tasks: [] },
    //{ id: 'bin', title: 'Bin', color: '#000000', tasks: [] },
  ];

  // Action Buttons
  handleAction(actionId: string) {
    switch (actionId) {
      case 'add-task':
        this.openAddTaskModal();
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

  /* Modal */

  // Template
  newTask: Partial<Task> = {
    title: '',
    description: '',
    deadlineDate: new Date('2001-01-01'),
  };

  // Modal Logic
  activeModal: string | undefined; // controls which modal is currently open

  // Open modal
  openAddTaskModal(task?: Task) {
    this.activeModal = 'add-task';
    // reset form
    this.newTask = { title: '', description: '', deadlineDate: undefined };
  }

  // Close modal
  closeAddTaskModal() {
    this.activeModal = undefined;
  }

  // Submit new task
  submitNewTask() {
    if (!this.newTask.title) return;

    const task: Task = {
      id: this.tasks.length + 1,
      title: this.newTask.title!,
      description: this.newTask.description,
      postDate: new Date(),
      completionDate: undefined,
      deadlineDate: this.newTask.deadlineDate,
      priority: 'low',
      status: 'todo',
    };

    this.tasks.push(task);
    const column = this.columns.find((c) => c.id === task.status);
    if (column) column.tasks.push(task);

    this.closeAddTaskModal();
  }

  // For drag and drop logic
  connectedDropLists: string[] = [];

  /* Helper functions */
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

  // For Card
  getDaysRemaining(task: Task): number {
    if (!task.deadlineDate) return 0;
    const posted = new Date(task.postDate).getTime();
    const deadline = new Date(task.deadlineDate).getTime();
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((deadline - posted) / msPerDay);
  }

  // For Task Form
  updateDeadline(dateString: string) {
    this.newTask.deadlineDate = dateString ? new Date(dateString) : undefined;
  }

  // On Init
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

        // Force Angular to update view
        this.cdr.detectChanges();
      });
  }
}
