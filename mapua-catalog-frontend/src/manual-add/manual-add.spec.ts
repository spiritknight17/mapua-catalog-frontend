import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAdd } from './manual-add';

describe('ManualAdd', () => {
  let component: ManualAdd;
  let fixture: ComponentFixture<ManualAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
