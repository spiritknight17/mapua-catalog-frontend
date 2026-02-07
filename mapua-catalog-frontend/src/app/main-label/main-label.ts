import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-label',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './main-label.html',
  styleUrls: ['./main-label.css'],
})
export class MainLabelComponent {
  @Input() icon: string = 'folder'; // default icon
  @Input() label: string = 'Title'; // text
}
