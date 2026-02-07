import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book!: Book;

  @Input() isMini: boolean = false;
  @Input() showButton: boolean = true;
  @Input() coverText: string = 'ISBN';
  @Input() isEditPage: boolean = false;

  get authorName(): string {
    return `${this.book.author.firstName} ${this.book.author.lastName}`;
  }
}
