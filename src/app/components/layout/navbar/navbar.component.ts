import { Component } from '@angular/core';

import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { RouterLink } from '@angular/router';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';
import { IconsModule } from '../../../icons/icons.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    // BrnAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmButtonDirective,

    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    // HlmMenuItemIconDirective,
    // HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    // HlmSubMenuComponent,
    BrnMenuTriggerDirective,

    IconsModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
