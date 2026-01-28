import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekUiAndDeadlineLists } from './week-ui-and-deadline-lists';

describe('WeekUiAndDeadlineLists', () => {
  let component: WeekUiAndDeadlineLists;
  let fixture: ComponentFixture<WeekUiAndDeadlineLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekUiAndDeadlineLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekUiAndDeadlineLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
