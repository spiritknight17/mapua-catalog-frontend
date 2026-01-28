import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookProcess } from './manage-book-process';

describe('ManageBookProcess', () => {
  let component: ManageBookProcess;
  let fixture: ComponentFixture<ManageBookProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBookProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
