import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserConfirmation } from './remove-user-confirmation';

describe('RemoveUserConfirmation', () => {
  let component: RemoveUserConfirmation;
  let fixture: ComponentFixture<RemoveUserConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveUserConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveUserConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
