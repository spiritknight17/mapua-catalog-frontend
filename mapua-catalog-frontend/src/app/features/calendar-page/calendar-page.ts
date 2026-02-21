import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { CalendarComponent } from '../../shared/components/calendar-component/calendar-component';
import { DeadlineComponent } from '../../shared/components/deadline-component/deadline-component';
import { TaskService } from '../../core/services/task.service';
import { CalendarComponentModel } from '../../shared/components/calendar-component/calendar-component-model';

@Component({
  selector: 'app-calendar-page',
  imports: [HeaderComponent, MainLabelComponent, CommonModule, ReactiveFormsModule, CalendarComponent, DeadlineComponent],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage implements OnInit{
  private taskService = inject (TaskService);
  searchControl = new FormControl('');
  tasks: CalendarComponentModel[] = [];
  calendarTasks: CalendarComponentModel[] = [];
  priorityFilter: 'all' | 'High' | 'Medium' | 'Low' = 'all';
  statusFilter: 'all' | 'To Do' | 'In Progress' | 'Review' | 'Mechanical' | 'Completed' = 'all';
  ngOnInit(){
    this.taskService.loadCalendarForCurrentUser().subscribe(models => {
      this.tasks = models;
      this.updateCalendarTasks();
    });
    this.searchControl.valueChanges.subscribe(() => {
      this.updateCalendarTasks();
    });
  }
  filterByPriority(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.priorityFilter = selectElement.value as any;
    this.updateCalendarTasks();
  }
  filterByStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.statusFilter = selectElement.value as any;
    this.updateCalendarTasks();
  }
  private updateCalendarTasks(){
    const term = (this.searchControl.value || '').toString().toLowerCase();
    this.calendarTasks == this.tasks.filter(t => {
      const priority = this.priorityFilter === 'all' ? true: t.priorityStatus === this.priorityFilter;
      const status = this.statusFilter === 'all' ? true: t.tasksStatus === this.statusFilter;
      const search = term ? t.title.toLowerCase().includes(term): true;
      return priority && status && search;
    });
  }
}