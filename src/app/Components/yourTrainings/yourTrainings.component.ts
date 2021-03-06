import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../../Services/firebase.service';

@Component({
  selector: 'yourTrainings',
  templateUrl: './yourTrainings.component.html',
  styleUrls: ['./yourTrainings.component.css']
})

export class YourTrainingsComponent {

    trainings: Array<any>;
    weekdays: Array<string> = [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Sonntag"
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        public firebaseService: FirebaseService
    ) {
        this.titleService.setTitle('Your trainings - BSTP');
        this.firebaseService.setYourTrainings();
    }

    private isUserTrainer(training: any) {
        return Object.values(training.trainer).indexOf(this.firebaseService.afAuth.auth.currentUser.email) > -1;
    }
}