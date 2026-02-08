import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { Catalog } from "../../shared/components/catalog/catalog";
import { CalendarModule, DateAdapter, provideCalendar, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarEvent, CalendarView, CalendarDatePipe } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-page',
  imports: [HeaderComponent, MainLabelComponent, Catalog, CalendarModule, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe, FlatpickrModule],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  template: `
    <button mwlCalendarPreviousView [view]="view" [(viewDate)]="viewDate" (viewDateChange)="closeOpenMonthViewDay()">Previous</button>
    <button mwlCalendarToday [(viewDate)]="viewDate">Today</button>
    <button mwlCalendarNextView [view]="view" [(viewDate)]="viewDate" (viewDateChange)="closeOpenMonthViewDay()">Next</button>
    <h3>{{ viewDate | calendarDate: view + 'ViewTitle' : 'en' }}</h3>
    <button (click)="setView(CalendarView.Month)" [class.active]="view === CalendarView.Month">Month</button>
    <button (click)="setView(CalendarView.Week)" [class.active]="view === CalendarView.Week">Week</button>
    <button (click)="setView(CalendarView.Day)" [class.active]="view === CalendarView.Day">Day</button>
    @switch (view) {
      @case (CalendarView.Month) {
        <mwl-calendar-month-view [viewDate]="viewDate" [events]="events" />
      }
      @case (CalendarView.Week) {
        <mwl-calendar-week-view [viewDate]="viewDate" [events]="events" />
      }
      @case (CalendarView.Day) {
        <mwl-calendar-day-view [viewDate]="viewDate" [events]="events" />
      }
    }
  `,
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage {
  viewDate = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
    },
  ];
  setView(view: CalendarView){
    this.view = view;
  }
}
