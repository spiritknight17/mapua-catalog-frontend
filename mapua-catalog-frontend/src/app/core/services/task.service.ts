import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarComponentModel } from '../../shared/components/calendar-component/calendar-component-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private mockTasks: CalendarComponentModel[] = [
    new CalendarComponentModel({
      title: 'Social and Professional Issues',
      description: 'Prepare slide deck',
      status: 'To Do',
      date: new Date(2026, 0, 5),
      assignee: 'Matthew',
      project: 'Acad'
    }),
    new CalendarComponentModel({
      title: 'Capstone Draft Review',
      description: 'First pass review',
      status: 'In Progress',
      date: new Date(2026, 0, 6),
      assignee: 'Gian',
      project: 'Capstone'
    }),
    new CalendarComponentModel({
      title: 'Mechanization Task',
      description: 'Hardware fit check',
      status: 'Mechanical',
      date: new Date(2026, 0, 8),
      assignee: 'AA',
      project: 'Robotics'
    }),
    new CalendarComponentModel({
      title: 'Module QA',
      description: 'Peer review module',
      status: 'Review',
      date: new Date(2026, 0, 13),
      assignee: 'BB',
      project: 'Library'
    }),
    new CalendarComponentModel({
      title: 'Submit Assignment',
      description: 'Final submission',
      status: 'Completed',
      date: new Date(2026, 0, 20),
      assignee: 'Matthew',
      project: 'Acad'
    }),
    new CalendarComponentModel({
      title: 'Project Sync',
      description: 'Team alignment',
      status: 'To Do',
      date: new Date(2026, 0, 22),
      assignee: 'CC',
      project: 'Ops'
    }),
    new CalendarComponentModel({
      title: 'Refactor Module',
      description: 'Cleanup and tests',
      status: 'In Progress',
      date: new Date(2026, 0, 23),
      assignee: 'DD',
      project: 'Frontend'
    }),
    new CalendarComponentModel({
      title: 'Presentation',
      description: 'Slides and demo',
      status: 'Review',
      date: new Date(2026, 0, 30),
      assignee: 'Matthew',
      project: 'Acad'
    }),
    new CalendarComponentModel({
      title: 'Backlog Grooming',
      description: 'Prioritize tickets',
      status: 'Mechanical',
      date: new Date(2026, 0, 9),
      assignee: 'EE',
      project: 'Ops'
    }),
    new CalendarComponentModel({
      title: 'Release Prep',
      description: 'Cut release',
      status: 'To Do',
      date: new Date(2026, 0, 1),
      assignee: 'FF',
      project: 'Frontend'
    })
  ];
  private tasksSubject = new BehaviorSubject<CalendarComponentModel[]>(this.mockTasks);
  tasks$: Observable<CalendarComponentModel[]> = this.tasksSubject.asObservable();
  constructor() {}
  setTasks(tasks: CalendarComponentModel[]) {
    this.tasksSubject.next(tasks);
  }
}
