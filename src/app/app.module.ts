import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';

import { AppRoutingModule }       from './app-routing.module';

import { FirebaseService }        from './Services/firebase.service';
import { ToastService }           from './Services/toast.service';

import { AuthGuard }              from './Guards/auth.guard';

import { AppComponent }           from './app.component';
import { YourTrainingsComponent } from './Components/yourTrainings/yourTrainings.component'
import { TrainingComponent }      from './Components/training/training.component'
import { IndividualtrainingComponent }      from './Components/individualtraining/individualtraining.component'
import { NewIndividualtrainingComponent }      from './Components/newIndividualtraining/newIndividualtraining.component'
import { LoginComponent }         from './Components/login/login.component'
import { SignupComponent }        from './Components/signup/signup.component'
import { SettingsComponent }        from './Components/settings/settings.component'

import { AngularFireModule }          from 'angularfire2';
import { AngularFireDatabaseModule }  from 'angularfire2/database';
import { AngularFireAuthModule }      from 'angularfire2/auth';
export const firebaseConfig = {
  apiKey: ' AIzaSyBzYuECavjYejiBywF6mFtO_v4KepzA-NE',
  authDomain: 'https://budo-sport-trainingsplaner.firebaseapp.com/',
  databaseURL: 'https://budo-sport-trainingsplaner.firebaseio.com/',
  storageBucket: 'budo-sport-trainingsplaner.appspot.com',
  messagingSenderId: '30491200671'
};


@NgModule({
  declarations: [
    AppComponent,
    YourTrainingsComponent,
    TrainingComponent,
    IndividualtrainingComponent,
    NewIndividualtrainingComponent,
    LoginComponent,
    SignupComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    FirebaseService,
    ToastService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
