import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSelectionModalComponent } from './book-selection-modal-component';

describe('BookSelectionModalComponent', () => {
  let component: BookSelectionModalComponent;
  let fixture: ComponentFixture<BookSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSelectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSelectionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
