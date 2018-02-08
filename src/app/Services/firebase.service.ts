import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ToastService, Toast } from './toast.service';

@Injectable()
export class FirebaseService {
  
    public user: Observable<firebase.User>;
    public currentTrainer: Observable<any[]>;

    public trainings: Array<any>;
    public training: any;
    public individualtraining: Observable<any>;
    public individualtrainingReference: any;

    public newTrainingReference: any;

    constructor(
        public afAuth: AngularFireAuth, 
        public db: AngularFireDatabase,
        private router: Router,
        public toastService: ToastService
    ) {
        this.user = afAuth.authState;
    }

    errorTranslation = {
        "auth/invalid-email": "Gib eine gültige E-Mail Adresse ein",
        "auth/user-not-found": "Es existiert kein Benutzer mit dieser E-Mail Adresse",
        "auth/wrong-password": "Das Passwort ist falsch",
        "auth/user-disabled": "Dieser Account wurde deaktiviert",
        "auth/weak-password": "Das Passwort sollte mindestens 6 Zeichen lang sein",
        "auth/requires-recent-login": "Du musst dich erneut einloggen",
        "auth/email-already-in-use": "E-Mail Adresse wird bereits benutzt",
        "auth/operation-not-allowed": "Diese Funktion ist momentan deaktiviert"
    };

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
            this.toastService.addToast("Du hast dich eingeloggt", "toast-success");
            this.router.navigate(['/yourTrainings']);
        })
        .catch(error => {
            console.log(error);
            this.toastService.addToast(this.errorTranslation[error.code], "toast-error");
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(response => {
            this.toastService.addToast("Du hast dich ausgeloggt", "toast-success");
        })
        .catch(error => {
            this.toastService.addToast(error.message, "toast-error");
        });;
        this.router.navigate(['/login']);        
    }

    setYourTrainings() {
        this.trainings = [];
        this.db.object('/trainings').valueChanges().subscribe(trainings => {
            for (var key in trainings) {
                trainings[key]["key"] = key;
                
                var trainerarray = [];
                for (var trainerkey in trainings[key].trainer) {
                    trainerarray.push(trainings[key].trainer[trainerkey]);
                }

                trainings[key].trainer = trainerarray;

                if(trainings[key].trainer.indexOf(this.afAuth.auth.currentUser.email) > -1) {
                    this.trainings.push(trainings[key]);                        
                } 
            }
        });
    }

    setTraining(id: string) {
        this.training = {};
        var training = this.db.object('/trainings/' + id).valueChanges().subscribe( training => {
            var individualtrainingsObject = training['individualtrainings'];
            var individualtrainingsArray = [];
            for (var key in individualtrainingsObject) {
                individualtrainingsObject[key]["key"] = key;
                individualtrainingsArray.push(individualtrainingsObject[key]);
            }

            individualtrainingsArray.sort(this.sortIndividualTraining);

            training['individualtrainings'] = individualtrainingsArray;

            var trainersObject = training['trainer'];
            var trainersArray = [];
            for (var key in trainersObject) {
                trainersArray.push(trainersObject[key]);
            }

            training['trainer'] = trainersArray;


            this.training = training;
        });
    }

    setIndividualtraining(id: string, individualid: string) {
        this.individualtrainingReference = this.db.object('/trainings/' + id + '/individualtrainings/' + individualid);
        this.individualtraining = this.individualtrainingReference.valueChanges();
    }

    setNewTrainingReference(id: string) {
        this.newTrainingReference = this.db.list('/trainings/' + id + '/individualtrainings/');
    }

    sortIndividualTraining(a, b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    }

    isLoggedIn() {
        return Boolean(this.afAuth.auth.currentUser);
    }

    findWithAttr(array: Array<any>, attr: string, value: any) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

}