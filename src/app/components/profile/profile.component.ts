import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmHintDirective } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmLabelDirective,
    HlmHintDirective,
    HlmButtonDirective,

    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective,

    // BrnSelectComponent,
    // HlmSelectDirective,

    CommonModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john@email.com',
    phone: '123-456-7890',
    country: 'United States',
    company: 'Tech Company',
    gender: 'male',
    meetLink: 'https://meet.example.com/johndoe',
  };
}
