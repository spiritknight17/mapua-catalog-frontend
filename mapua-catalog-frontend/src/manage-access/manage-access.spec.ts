import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccess } from './manage-access';

describe('ManageAccess', () => {
  let component: ManageAccess;
  let fixture: ComponentFixture<ManageAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
