import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: { firstName: string; lastName: string };
  isbn: string;
  year: number;
  collection: string;
  suppress: boolean;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Mock data for now
  private mockBooks: Book[] = [
    {
      id: 1,
      title: 'Angular Basics',
      author: { firstName: 'John', lastName: 'Doe' },
      isbn: '978-1234567890',
      year: 2021,
      collection: 'Programming',
      suppress: false,
      price: 1200,
    },
    {
      id: 2,
      title: 'TypeScript Deep Dive',
      author: { firstName: 'Jane', lastName: 'Smith' },
      isbn: '978-0987654321',
      year: 2022,
      collection: 'Programming',
      suppress: false,
      price: 1500,
    },
    {
      id: 3,
      title: 'Learning Kanban',
      author: { firstName: 'Alice', lastName: 'Johnson' },
      isbn: '978-1112223334',
      year: 2020,
      collection: 'Management',
      suppress: true,
      price: 900,
    },
  ];

  // Central store for components to subscribe to
  private booksSubject = new BehaviorSubject<Book[]>(this.mockBooks);
  books$ = this.booksSubject.asObservable();

  constructor() {}

  // Fetch all books (for now just returns mock data)
  fetchAllBooks() {
    // In the future, replace with HTTP call
    this.booksSubject.next(this.mockBooks);
  }

  // Add a new book
  addBook(book: Book) {
    const current = this.booksSubject.value;
    this.booksSubject.next([...current, book]);
  }

  // Update a book
  updateBook(updated: Book) {
    const current = this.booksSubject.value.map((b) => (b.id === updated.id ? updated : b));
    this.booksSubject.next(current);
  }
}
