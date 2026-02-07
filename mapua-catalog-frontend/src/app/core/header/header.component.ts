import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userInitials: string = ''; // empty for now

  constructor() {
    // placeholder: you can later replace with AuthService logic
    this.userInitials = 'AA'; // default placeholder
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
