import { CalendarComponentModel } from './calendar-component-model';

describe('CalendarComponentModel', () => {
  it('should create an instance with default values', () => {
    const task = new CalendarComponentModel({});
    expect(task).toBeTruthy();
    expect(task.title).toBe('');
  });
  it('should correctly calculate priority based on the date', () => {
    const today = new Date();
    const twoDaysFromNow = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
    const task = new CalendarComponentModel({
      title: 'Template Task',
      date: twoDaysFromNow
    });
    expect(task.priorityStatus).toBe('Urgent');
  });
});
