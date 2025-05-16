import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css',
})
export class DetailsCardComponent {
  @Input() cardHeading: string = '';
  @Input() cardDetail: string = '';
}
