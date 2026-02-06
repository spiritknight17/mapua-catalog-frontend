import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McBoard } from './kanban-board-page.component';

describe('McBoard', () => {
  let component: McBoard;
  let fixture: ComponentFixture<McBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
