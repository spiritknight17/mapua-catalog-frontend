import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../core/header/header.component';
import { MainLabelComponent } from '../../../shared/components/main-label/main-label';
import { Catalog } from '../../../shared/components/catalog/catalog';
import { Book, BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-catalog-page.component',
  imports: [HeaderComponent, MainLabelComponent, Catalog],
  templateUrl: './book-catalog-page.component.html',
  styleUrl: './book-catalog-page.component.css',
})
export class BookCatalogPageComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Subscribe to the shared books data
    this.bookService.books$.subscribe((books) => {
      this.books = books;
    });

    // Fetch books (currently mock data)
    this.bookService.fetchAllBooks();
  }
}
