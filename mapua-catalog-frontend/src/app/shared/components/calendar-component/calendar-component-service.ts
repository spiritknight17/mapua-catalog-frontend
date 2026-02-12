import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarComponentModel } from './calendar-component-model';
@Injectable({
  providedIn: 'root',
})
export class CalendarComponentService {
  private tasksSubject = new BehaviorSubject<CalendarComponentModel[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  getPrioritizedTasks(): Observable<CalendarComponentModel[]> {
    return this.tasks$.pipe(
      map(tasks => [...tasks].sort((a, b) => {
        const aUrgent = a.daysRemaining <= 7 ? -1 : 1;
        const bUrgent = b.daysRemaining <= 7 ? -1 : 1;
        return aUrgent - bUrgent || a.date.getTime() - b.date.getTime();
      }))
    );
  }
  addTask(taskData: Partial<CalendarComponentModel>){
    const newTask = new CalendarComponentModel(taskData);
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
  }
}
