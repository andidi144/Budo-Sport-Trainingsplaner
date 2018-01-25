import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { AuthGuard }            from './Guards/auth.guard';

import { YourTrainingsComponent } from './Components/yourTrainings/yourTrainings.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/yourTrainings', pathMatch: 'full' },
  { path: 'yourTrainings', component: YourTrainingsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}