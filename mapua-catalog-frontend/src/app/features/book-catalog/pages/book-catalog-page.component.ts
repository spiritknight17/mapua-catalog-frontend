import { Component } from '@angular/core';
import { HeaderComponent } from '../../../core/header/header.component';
import { MainLabelComponent } from '../../../shared/components/main-label/main-label';

@Component({
  selector: 'app-book-catalog-page.component',
  imports: [HeaderComponent, MainLabelComponent],
  templateUrl: './book-catalog-page.component.html',
  styleUrl: './book-catalog-page.component.css',
})
export class BookCatalogPageComponent {}
