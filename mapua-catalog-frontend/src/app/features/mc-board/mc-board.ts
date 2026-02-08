import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { CommonModule } from '@angular/common';
import { KanbanCard } from '../../shared/components/kanban-card/kanban-card';
import { Catalog } from '../../shared/components/catalog/catalog';
import { BookDetailsComponent } from '../../shared/components/book-details/book-details.component';
import { Book, BookService } from '../../core/services/book.service';

type McBoardModal = null | 'catalog' | 'book-details';

@Component({
  selector: 'app-mc-board',
  imports: [
    HeaderComponent,
    MainLabelComponent,
    CommonModule,
    KanbanCard,
    Catalog,
    BookDetailsComponent,
    CommonModule,
  ],
  templateUrl: './mc-board.html',
  styleUrl: './mc-board.css',
})
export class McBoard implements OnInit {
  pageActions = [
    { id: 'search', icon: 'search', tooltip: 'Search' },
    { id: 'filter', icon: 'filter_list', tooltip: 'Filter' },
    { id: 'add-book', icon: 'add', tooltip: 'Add Book' },
    { id: 'add-task', icon: 'add', tooltip: 'Add Task' },
  ];

  catalogActions = [
    { id: 'confirm', icon: 'check', tooltip: 'Add to Board' },
    { id: 'close', icon: 'close', tooltip: 'Close' },
  ];

  bookDetailsActions = [
    { id: 'save', icon: 'save', tooltip: 'Save Task' },
    { id: 'close', icon: 'close', tooltip: 'Close' },
  ];

  activeModal: McBoardModal = null;

  handleAction(actionId: string) {
    switch (actionId) {
      case 'add-book':
        this.activeModal = 'catalog';
        break;
    }
  }

  handleModalAction(actionId: string) {
    switch (actionId) {
      case 'close':
        this.closeModal();
        break;

      case 'confirm':
        // catalog → add selected books to board
        break;

      case 'save':
        // book-details → save task
        break;
    }
  }

  closeModal() {
    this.activeModal = null;
  }

  selectedItemTaskId: string | null = null;

  openAddTaskModal(itemTaskId: string) {
    this.selectedItemTaskId = itemTaskId;
    this.activeModal = 'book-details';
    console.log('Open Add Task Modal for itemTaskId:', itemTaskId);
  }

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

  trackByTitle(index: number, task: any) {
    return task.title;
  }

  columns = [
    {
      title: 'To Do',
      color: '#E9A015',
      tasks: [
        {
          itemTaskId: 'task-1',
          title: 'Screen Acting Skills',
          tasksRemaining: 4,
          collection: 'SMS',
          year: 2020,
          avatars: ['AA', 'BB'],
          subtasks: [
            { type: 'Metadata Entry', user: 'Gian' },
            { type: 'Classification', user: 'Balong' },
            { type: 'Subject Headings', user: 'Derven' },
            { type: 'Quality Check', user: 'Matthew' },
          ],
        },
        {
          itemTaskId: 'task-2',
          title: 'Media Experiences: Engaging W...',
          tasksRemaining: 3,
          collection: 'Email',
          year: 2021,
          avatars: ['CC'],
          subtasks: [
            { type: 'Metadata Entry', user: 'Gian' },
            { type: 'Subject Headings', user: 'Derven' },
            { type: 'Quality Check', user: 'Matthew' },
          ],
        },
        {
          itemTaskId: 'task-3',
          title: 'Screen Voting Skills',
          tasksRemaining: 2,
          collection: 'SMS',
          year: 2020,
          avatars: ['AA', 'BB', 'CC'],
          subtasks: [
            { type: 'Metadata Entry', user: 'Gian' },
            { type: 'Classification', user: 'Balong' },
          ],
        },
        {
          itemTaskId: 'task-4',
          title: 'Media Experiences: Engaging W...',
          tasksRemaining: 1,
          collection: 'Email',
          year: 2021,
          avatars: ['CC', 'DD'],
          subtasks: [{ type: 'Quality Check', user: 'Matthew' }],
        },
        {
          itemTaskId: 'task-5',
          title: 'Screen Acting Skills',
          tasksRemaining: 4,
          collection: 'SMS',
          year: 2020,
          avatars: ['AA', 'BB'],
          subtasks: [
            { type: 'Metadata Entry', user: 'Gian' },
            { type: 'Classification', user: 'Balong' },
            { type: 'Subject Headings', user: 'Derven' },
            { type: 'Quality Check', user: 'Matthew' },
          ],
        },
      ],
    },
    {
      title: 'In Progress',
      color: '#9A0000',
      tasks: [],
    },
    {
      title: 'Review',
      color: '#5F0707',
      tasks: [],
    },
    {
      title: 'Mechanical',
      color: '#BC9595',
      tasks: [],
    },
    {
      title: 'Completed',
      color: '#26B524',
      tasks: [],
    },
  ];
  
}
