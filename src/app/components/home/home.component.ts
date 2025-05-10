import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { IconsModule } from '../../icons/icons.module';
import { BrokersCardComponent } from './brokers-card/brokers-card.component';
import { FeatureCardComponent } from './feature-card/feature-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconsModule,
    HlmButtonDirective,
    FeatureCardComponent,
    BrokersCardComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  features = [
    {
      title: 'AI-Powered Presentation Builder',
      description: 'Automate content, layout, and design.',
      imageUrl: 'assets/feature/feature_1.png',
    },
    {
      title: 'Financial Calculations',
      description: 'NOI, Cap Rate, IRR auto-generated.',
      imageUrl: 'assets/feature/feature_2.png',
    },
    {
      title: 'Secure & Compliant',
      description: 'Data privacy and investor-ready outputs.',
      imageUrl: 'assets/feature/feature_3.png',
    },
  ];

  brokers = [
    {
      icon: '🏢',
      title: 'Commercial Brokers',
      description: 'Streamline investor presentations',
    },
    {
      icon: '🏘️',
      title: 'Residential Teams',
      description: 'Level up listing packages',
    },
    {
      icon: '💼',
      title: 'Private Equity & REITs',
      description: 'Fast internal & external reports',
    },
    {
      icon: '🧠',
      title: 'Marketing Teams',
      description: 'Reduce design and copy cycles',
    },
  ];
}
