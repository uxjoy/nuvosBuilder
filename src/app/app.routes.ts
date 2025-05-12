import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './components/profileLayout/change-password/change-password.component';
import { NotificationsComponent } from './components/profileLayout/notifications/notifications.component';
import { ProfileEditComponent } from './components/profileLayout/profile-edit/profile-edit.component';
import { ProfileLayoutComponent } from './components/profileLayout/profile-layout.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileLayoutComponent,

        children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
          },
        ],
      },
    ],
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  // },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
