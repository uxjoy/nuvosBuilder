import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  getUserInfo(): string | null {
    const storedUser: string | null = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      this.router.navigate(['/']);

      console.log(userInfo);
      return userInfo;
    } else {
      console.log('No user found!');
      return null;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/sign-in']);
  }
}
