import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { CalendarComponent } from '../../shared/components/calendar-component/calendar-component';
import { DeadlineComponent } from '../../shared/components/deadline-component/deadline-component';

@Component({
  selector: 'app-calendar-page',
  imports: [HeaderComponent, MainLabelComponent, CommonModule, ReactiveFormsModule, CalendarComponent, DeadlineComponent],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage implements OnInit{
  searchControl = new FormControl('');
  tasks: any[] = [];
  ngOnInit(){
      
  }
  filterByPriority(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const priority = selectElement.value;
    console.log('Filtering by:', priority);
  }
  filterByStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    console.log('Filtering by:', status);
  }
}