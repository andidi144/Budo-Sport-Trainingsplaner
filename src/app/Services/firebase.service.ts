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
    public individualtraining: any;
    public individualtrainings: Array<any>;

    private months: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

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

            this.training = training;
            this.setNextDates();
        });
    }

    setIndividualtraining(id: string, individualid: string) {
        this.individualtraining = {};
        var training = this.db.object('/trainings/' + id + '/individualtrainings/' + individualid).valueChanges().subscribe( training => {
            this.individualtraining = training;
        });
    }

    setNextDates() {
        var nextTraning = new Date();
        nextTraning.setDate(nextTraning.getDate() + ((7-nextTraning.getDay())%7+(Number(this.training.weekday)+1) % 7));

        var trainingDates = []; 

        for (var i = 0; i < 10; i++) {
            var d = new Date();
            d.setDate(nextTraning.getDate() + i * 7);
            trainingDates.push(d);
        }
        this.individualtrainings = [];
        trainingDates.forEach(trainingDate => {
            var formattedDate = trainingDate.getFullYear() + '-' + this.months[trainingDate.getMonth()] + '-' + trainingDate.getDate();
            var index = this.findWithAttr(this.training.individualtrainings, "date", formattedDate);
            if(index > -1) {
                var selectedTraining = this.training.individualtrainings[index]
                this.individualtrainings.push(selectedTraining);
            }
            else {
                this.individualtrainings.push({
                    date: formattedDate,
                    subject: "Not defined",
                    maintrainer: "",
                    notes: ""
                })
            }
        })
        console.log(this.individualtrainings);
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