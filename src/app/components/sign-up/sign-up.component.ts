import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
    HlmFormFieldModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    // lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordStrengthValidator,
    ]),
  });

  // firstName = new FormControl('nuvos123');
  // lastName: string = 'Rahman';
  // email: string = 'joy@email.com';
  // password: string = 'nuvos123';

  onSubmit() {
    console.log(this.userForm.value);
  }

  get fullName() {
    return this.userForm.get('fullName');
  }

  // get lastName() {
  //   return this.userForm.get('lastName');
  // }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  // Custom validator (uppercase letter + number required)
  passwordStrengthValidator(control: FormControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    const specialChar = /[!@#$%^&*]/.test(value);

    const valid = hasUppercase && hasDigit && specialChar;
    return valid ? null : { weakPassword: true };
  }
}
