import { Component } from '@angular/core';
import { HeaderComponent } from '../../../core/header/header.component';
import { MainLabelComponent } from '../../../shared/components/main-label/main-label';
import { Catalog } from '../../../shared/components/catalog/catalog';

@Component({
  selector: 'app-book-catalog-page.component',
  imports: [HeaderComponent, MainLabelComponent, Catalog],
  templateUrl: './book-catalog-page.component.html',
  styleUrl: './book-catalog-page.component.css',
})
export class BookCatalogPageComponent {}
