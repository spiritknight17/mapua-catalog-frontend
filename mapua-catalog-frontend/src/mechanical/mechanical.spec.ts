import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mechanical } from './mechanical';

describe('Mechanical', () => {
  let component: Mechanical;
  let fixture: ComponentFixture<Mechanical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mechanical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mechanical);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
