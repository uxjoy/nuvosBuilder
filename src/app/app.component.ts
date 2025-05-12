import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Nuvos Presentations';

  user: any = {
    name: 'Nuvos Admin',
    email: 'nuvos@email.com',
    password: 'Nuvos@123',
  };

  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(
      (user: any) => user.email === this.user.email
    );
    if (userExists) {
      console.log('User already exists');
      return;
    }
    users.push(this.user);

    localStorage.setItem('users', JSON.stringify(users));
  }
}
