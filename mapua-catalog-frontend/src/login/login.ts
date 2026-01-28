import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class App {
  protected readonly title = signal('mapua-catalog-frontend');
}
