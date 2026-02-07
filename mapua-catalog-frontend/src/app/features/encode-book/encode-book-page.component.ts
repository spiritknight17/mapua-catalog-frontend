import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { MainLabelComponent } from '../../shared/components/main-label/main-label';
import { BookDetailsComponent } from '../../shared/components/book-details/book-details.component';

@Component({
  selector: 'app-encode-book-page.component',
  imports: [HeaderComponent, MainLabelComponent, BookDetailsComponent],
  templateUrl: './encode-book-page.component.html',
  styleUrl: './encode-book-page.component.css',
})
export class EncodeBookPageComponent {}
