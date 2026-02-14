import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { CommonModule } from '@angular/common';
import { KanbanCard } from '../../shared/components/kanban-card/kanban-card';
import { Book, BookService } from '../../core/services/book.service';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

type McBoardModal = null | 'catalog' | 'book-details';

interface KanbanTask {
  itemTaskId: string;
  title: string;
  tasksRemaining: number;
  collection: string;
  year: number;
  avatars: string[];
  subtasks: any[];
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-mc-board',
  imports: [
    HeaderComponent,
    MainLabelComponent,
    CommonModule,
    KanbanCard,
    CommonModule,
    DragDropModule,
  ],
  templateUrl: './mc-board.html',
  styleUrl: './mc-board.css',
})
export class McBoard implements OnInit {
  columns: KanbanColumn[] = [
    {
      id: 'todo',
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
          title: 'Media Files! The Awakening.',
          tasksRemaining: 1,
          collection: 'Email',
          year: 2021,
          avatars: ['CC', 'DD'],
          subtasks: [{ type: 'Quality Check', user: 'Matthew' }],
        },
        {
          itemTaskId: 'task-5',
          title: 'Atomic Habits',
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
      id: 'in-progress',
      title: 'In Progress',
      color: '#9A0000',
      tasks: [
        {
          itemTaskId: 'task-2',
          title: 'Book of Life',
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
          itemTaskId: 'task-2',
          title: 'ET: The Extra-Terrestrial',
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
          itemTaskId: 'task-2',
          title: "Harry Potter and the Sorcerer's Stone",
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
          itemTaskId: 'task-2',
          title: 'Transformers: Rise of the Beasts',
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
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: '#5F0707',
      tasks: [
        {
          itemTaskId: 'task-2',
          title: 'Maze Runner: The Death Cure',
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
          itemTaskId: 'task-2',
          title: 'Fantastic Beasts: The Secrets of Dumbledore',
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
      ],
    },
    {
      id: 'mechanical',
      title: 'Mechanical',
      color: '#BC9595',
      tasks: [
        {
          itemTaskId: 'task-2',
          title: 'Casper',
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
          itemTaskId: 'task-2',
          title: 'Ghost Files',
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
      ],
    },
    {
      id: 'completed',
      title: 'Completed',
      color: '#26B524',
      tasks: [
        {
          itemTaskId: 'task-2',
          title: 'Back to the Future: Part II',
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
          itemTaskId: 'task-2',
          title: 'Jumanji: Welcome to the Jungle',
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
      ],
    },
  ];

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

  connectedDropLists: string[] = [];

  ngOnInit(): void {
    // Subscribe to the shared books data
    this.bookService.books$.subscribe((books) => {
      this.books = books;
    });
    this.connectedDropLists = this.columns.map((c) => c.id);

    // Fetch books (currently mock data)
    this.bookService.fetchAllBooks();
  }

  drop(event: CdkDragDrop<KanbanTask[]>) {
    if (event.previousContainer === event.container) {
      // Reordering inside same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log(this.columns); // verify structure
  }

  trackByTitle(index: number, task: any) {
    return task.title;
  }
}
