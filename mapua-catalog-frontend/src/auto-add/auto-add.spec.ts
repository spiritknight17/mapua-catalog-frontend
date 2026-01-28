import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAdd } from './auto-add';

describe('AutoAdd', () => {
  let component: AutoAdd;
  let fixture: ComponentFixture<AutoAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
