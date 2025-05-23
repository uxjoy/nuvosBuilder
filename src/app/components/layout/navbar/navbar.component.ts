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
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';
import { IconsModule } from '../../../icons/icons.module';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmButtonDirective,

    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,

    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    BrnMenuTriggerDirective,

    IconsModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  loggedinUser: any;

  ngOnInit(): void {
    this.loggedinUser = this.userService.getUserInfo();
    console.log(this.loggedinUser);
  }

  logout() {
    this.userService.logout();
  }
}
