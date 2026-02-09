import { TestBed } from '@angular/core/testing';

import { CalendarComponentService } from './calendar-component-service';

describe('CalendarComponentService', () => {
  let service: CalendarComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
