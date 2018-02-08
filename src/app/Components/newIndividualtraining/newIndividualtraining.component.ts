import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../../Services/firebase.service';

import { ToastService, Toast } from '../../Services/toast.service';

@Component({
  selector: 'newIndividualtraining',
  templateUrl: './newIndividualtraining.component.html',
  styleUrls: ['./newIndividualtraining.component.css']
})

export class NewIndividualtrainingComponent {

    training: any;
    id: string;
    individualid: string;
    private sub: any;

    newTraining: any = {
        subject: "",
        maintrainer: "",
        date: "",
        notes: ""
    };

    weekdays: Array<string> = [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Sonntag"
    ]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        public firebaseService: FirebaseService,
        public toastService: ToastService
    ) {
        this.titleService.setTitle('Training - BSTP');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.id = params['id'];
           this.firebaseService.setNewTrainingReference(this.id);
        });
    }

    createTraining(form: any) {
        this.firebaseService.newTrainingReference.push(form).then(response => {
            this.toastService.addToast("Das Training wurde erstellt", "toast-success");
        })
        .catch(error => {
            this.toastService.addToast(error.message, "toast-error");
        });
        this.router.navigate(['/training/' + this.id]);
    }
}