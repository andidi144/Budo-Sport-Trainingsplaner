import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
        private router: Router
    ) {
        this.user = afAuth.authState;
    }

    login(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
            this.router.navigate(['/yourTrainings']);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
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