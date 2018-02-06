import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { AuthGuard }            from './Guards/auth.guard';

import { YourTrainingsComponent } from './Components/yourTrainings/yourTrainings.component';
import { TrainingComponent }      from './Components/training/training.component'
import { IndividualtrainingComponent }  from './Components/individualtraining/individualtraining.component'
import { NewIndividualtrainingComponent }      from './Components/newIndividualtraining/newIndividualtraining.component'
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SettingsComponent } from './Components/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/yourTrainings', pathMatch: 'full' },
  { path: 'yourTrainings', component: YourTrainingsComponent, canActivate: [AuthGuard] },
  { path: 'training/:id', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'training/:id/:individualid', component: IndividualtrainingComponent, canActivate: [AuthGuard] },
  { path: 'new/training/:id', component: NewIndividualtrainingComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}