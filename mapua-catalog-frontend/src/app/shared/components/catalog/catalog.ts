import { Component } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-catalog',
  imports: [BookCardComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {}
