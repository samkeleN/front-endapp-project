import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },  // Default route (login page)
  { path: 'dashboard', component: DashboardComponent }, // Dashboard route
  { path: 'signup', component: RegisterComponent } // Register route
];
