import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [BookCardComponent, CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  @Input() books: any[] = []; // list of book objects
  @Input() selectable: boolean = false; // whether books can be selected
  @Output() selectionChange = new EventEmitter<any[]>(); // emits selected books

  selectedBooks: any[] = [];

  toggleSelection(book: any) {
    const index = this.selectedBooks.indexOf(book);
    if (index > -1) {
      this.selectedBooks.splice(index, 1);
    } else {
      this.selectedBooks.push(book);
    }
    this.selectionChange.emit(this.selectedBooks);
  }
}
