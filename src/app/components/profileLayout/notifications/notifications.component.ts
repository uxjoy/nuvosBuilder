import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    HlmCheckboxComponent,
    HlmLabelDirective,
    HlmButtonDirective,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {}
