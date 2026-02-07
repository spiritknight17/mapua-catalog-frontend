// book-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BookCardField {
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: 'app-book-card',
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() bookData!: BookCardField[]; // data to display
  @Input() isMini: boolean = false; // whether it’s a small version
  @Input() showButton: boolean = true; // whether to show the Add/Save button
  @Input() coverText: string = 'ISBN'; // top cover text
  @Input() isEditPage: boolean = false; // determines button text
}
