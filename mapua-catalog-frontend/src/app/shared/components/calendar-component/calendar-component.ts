import { Component, OnInit, Input, inject } from '@angular/core';
import { CalendarComponentModel } from './calendar-component-model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-calendar-component',
  imports: [CommonModule],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.css',
})
export class CalendarComponent implements OnInit {
  @Input() tasks: CalendarComponentModel[] = [];
  private taskService = inject(TaskService);
  viewDate: Date = new Date();
  daysInMonth: Date[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  viewMode: 'month' | 'week' = 'month';
  ngOnInit(){
      this.taskService.tasks$.subscribe(ts => {
        this.tasks = ts;
        this.generateCalendarGrid();
      });
      this.generateCalendarGrid();
  }
  isToday(date: Date): boolean{
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  getStatusClass(task: CalendarComponentModel): string {
    const s = task.tasksStatus;
    if (s === 'To Do') return 'status-todo';
    if (s === 'In Progress') return 'status-in-progress';
    if (s === 'Review') return 'status-review';
    if (s === 'Mechanical') return 'status-mechanical';
    return 'status-completed';
  }
  generateCalendarGrid(){
    if (this.viewMode === 'week') {
      const current = new Date(this.viewDate);
      const day = current.getDay();
      const start = new Date(current);
      start.setDate(current.getDate() - day);
      const dates: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        dates.push(d);
      }
      this.daysInMonth = dates;
      return;
    }
    const firstOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const lastOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    const start = new Date(firstOfMonth);
    start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());
    const end = new Date(lastOfMonth);
    end.setDate(lastOfMonth.getDate() + (6 - lastOfMonth.getDay()));
    const dates: Date[] = [];
    const cur = new Date(start);
    while (cur <= end) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    this.daysInMonth = dates;
  }
  getTasksForDate(date: Date): CalendarComponentModel[]{
    return this.tasks.filter(t => 
      t.date.getDate() === date.getDate() &&
      t.date.getMonth() === date.getMonth() &&
      t.date.getFullYear() === date.getFullYear()
    );
  }
  nextMonth(){
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
    this.generateCalendarGrid();
  }
  previousMonth(){
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
    this.generateCalendarGrid();
  }
  switchToMonth(){
    this.viewMode = 'month';
    this.generateCalendarGrid();
  }
  switchToWeek(){
    this.viewMode = 'week';
    this.generateCalendarGrid();
  }
}
