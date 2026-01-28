import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalyticsBasedOnCategory } from './view-analytics-based-on-category';

describe('ViewAnalyticsBasedOnCategory', () => {
  let component: ViewAnalyticsBasedOnCategory;
  let fixture: ComponentFixture<ViewAnalyticsBasedOnCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAnalyticsBasedOnCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnalyticsBasedOnCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
