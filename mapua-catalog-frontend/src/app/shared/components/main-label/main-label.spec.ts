import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLabel } from './main-label';

describe('MainLabel', () => {
  let component: MainLabel;
  let fixture: ComponentFixture<MainLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLabel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
