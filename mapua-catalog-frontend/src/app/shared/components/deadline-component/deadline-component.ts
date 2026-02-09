import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, map, startWith, Observable } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { CalendarComponentModel } from '../calendar-component/calendar-component-model';

@Component({
  selector: 'app-deadline-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deadline-component.html',
  styleUrl: './deadline-component.css',
})
export class DeadlineComponent {
  @Input() tasks: CalendarComponentModel[] = [];
  private taskService = inject(TaskService);

  tasks$ = this.taskService.tasks$;

  searchControl = new FormControl('', { nonNullable: true });

  sortedTasks$ = combineLatest([
    this.tasks$,
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    )
  ]).pipe(
    map(([tasks, search]: [CalendarComponentModel[], string]) => {
      const rank = { 'Urgent': 0, 'Upcoming': 1, 'Distance': 2 } as const;
      return tasks
        .filter((t: CalendarComponentModel) => 
          t.title.toLowerCase().includes(search.toLowerCase()) // Fixed typo: toLowerCase
        )
        .sort((a: CalendarComponentModel, b: CalendarComponentModel) => {
          const prio = rank[a.priorityStatus] - rank[b.priorityStatus];
          if (prio !== 0) return prio;
          return a.date.getTime() - b.date.getTime();
        });
    })
  );

  getDeadLineStatus(date: Date) {
    const diff = Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 3) return 'Urgent';
    if (diff <= 7) return 'Upcoming';
    return 'Distance';
  }
  getStatusClass(task: CalendarComponentModel): string {
    const s = task.tasksStatus;
    if (s === 'To Do') return 'status-todo';
    if (s === 'In Progress') return 'status-in-progress';
    if (s === 'Review') return 'status-review';
    if (s === 'Mechanical') return 'status-mechanical';
    return 'status-completed';
  }
  toggleExpand(task: CalendarComponentModel): void{
    task.isExpanded = !task.isExpanded;
  }
}
