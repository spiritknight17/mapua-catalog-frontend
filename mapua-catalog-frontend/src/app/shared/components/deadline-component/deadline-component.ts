import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, interval, map, startWith, Observable } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { CalendarComponentModel } from '../calendar-component/calendar-component-model';

@Component({
  selector: 'app-deadline-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deadline-component.html',
  styleUrl: './deadline-component.css',
})
export class DeadlineComponent {
  public dueDate: Date = new Date(); 
  @Input() tasks: CalendarComponentModel[] = [];
  private taskService = inject(TaskService);

  tasks$ = this.taskService.tasks$;

  searchControl = new FormControl('', { nonNullable: true });

  groupedTasks$ = combineLatest([
    this.tasks$,
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    ),
    interval(60_000).pipe(startWith(0))
  ]).pipe(
    map(([tasks, search]: [CalendarComponentModel[], string, number]) => {
      const normalizedSearch = search.trim().toLowerCase();
      const filtered = tasks.filter((t: CalendarComponentModel) =>
        t.title.toLowerCase().includes(normalizedSearch)
      );

      const groups: Record<'High' | 'Medium' | 'Low', CalendarComponentModel[]> = {
        High: [],
        Medium: [],
        Low: [],
      };

      for (const task of filtered) {
        groups[this.getDeadLineStatus(task.date)].push(task);
      }

      const sortWithinGroup = (a: CalendarComponentModel, b: CalendarComponentModel) => {
        const byDate = a.date.getTime() - b.date.getTime();
        if (byDate !== 0) return byDate;
        return a.title.localeCompare(b.title);
      };

      return (['High', 'Medium', 'Low'] as const)
        .map((key) => ({
          key,
          label: key,
          tasks: groups[key].sort(sortWithinGroup),
        }))
        .filter((g) => g.tasks.length > 0);
    })
  );

  getDeadLineStatus(date: Date) {
    const diff = Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 3) return 'High';
    if (diff <= 7) return 'Medium';
    return 'Low';
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

  trackByTaskId(index: number, task: CalendarComponentModel) {
    return task.id;
  }

  trackByGroupKey(index: number, group: { key: string }) {
    return group.key;
  }
}
