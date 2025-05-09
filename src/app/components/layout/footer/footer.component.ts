import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../../icons/icons.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  websiteUrl = 'https://nuvoscre.com';
  linkedinUrl = 'https://www.linkedin.com/company/nuvoscre';
}
