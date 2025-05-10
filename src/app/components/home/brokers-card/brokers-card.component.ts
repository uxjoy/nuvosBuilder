import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brokers-card',
  standalone: true,
  imports: [],
  templateUrl: './brokers-card.component.html',
  styleUrl: './brokers-card.component.scss',
})
export class BrokersCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
