import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCatalog } from './to-catalog';

describe('ToCatalog', () => {
  let component: ToCatalog;
  let fixture: ComponentFixture<ToCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
