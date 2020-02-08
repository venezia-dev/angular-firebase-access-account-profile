// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import { AuthGuard } from './auth/auth.guard';

// Components
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/user/profile/profile.component';

const routes: Routes = [
	{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
	{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
	{path: 'signin', component: SigninComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'forgot-password', component: ForgotPasswordComponent},
	{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{path: '**', component: NotFoundComponent}
  ];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
