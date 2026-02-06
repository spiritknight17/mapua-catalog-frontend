import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogPageComponent } from './book-catalog-page.component';

describe('BookCatalogPageComponent', () => {
  let component: BookCatalogPageComponent;
  let fixture: ComponentFixture<BookCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalogPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
