import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBooks } from './filter-books';

describe('FilterBooks', () => {
  let component: FilterBooks;
  let fixture: ComponentFixture<FilterBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
