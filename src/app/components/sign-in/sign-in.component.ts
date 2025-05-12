import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  HlmAlertDirective,
  HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmHintDirective } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmHintDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,

    FormsModule,
    IconsModule,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  showPassword: boolean = false;
  userInfo!: string;
  errorMessage: string = '';
  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('user');

    if (storedUser) {
      this.userInfo = JSON.parse(storedUser);
      console.log(this.userInfo);
    }
  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u: any) =>
          u.email === this.user.email && u.password === this.user.password
      );

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid email or password';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); // clear message after 3 seconds
      }
    } else {
      alert('Form is invalid\nEmail: nuvos@email.com\nPassword: Nuvos@123');
    }
  }
}
