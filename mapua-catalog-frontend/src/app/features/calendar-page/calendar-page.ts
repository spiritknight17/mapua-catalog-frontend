import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';

@Component({
  selector: 'app-calendar-page',
  imports: [HeaderComponent, MainLabelComponent],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage {

}
