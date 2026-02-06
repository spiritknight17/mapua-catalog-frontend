import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeBookPageComponent } from './encode-book-page.component';

describe('EncodeBookPageComponent', () => {
  let component: EncodeBookPageComponent;
  let fixture: ComponentFixture<EncodeBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncodeBookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodeBookPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
