import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { IconsModule } from '../../icons/icons.module';
import { UserService } from '../../services/user.service';

interface User {
  name: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmFormFieldModule,

    RouterLink,
    FormsModule,
    IconsModule,
    NgClass,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  showPassword: boolean = false;
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  passwordPattern: any =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'; // At
  // least 8 characters, at least one letter and one number

  constructor(private router: Router, private userService: UserService) {}

  user: User = {
    name: '',
    email: '',
    password: '',
  };

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('user');

    if (storedUser) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find(
        (user: User) => user.email === this.user.email
      );
      if (userExists) {
        console.log('User already exists');
        return;
      }
      users.push(this.user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));

      this.router.navigate(['/']);

      console.log('Signup success:', this.user);
    } else {
      console.log('Form is invalid or passwords don’t match', form);
    }
  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }
}
