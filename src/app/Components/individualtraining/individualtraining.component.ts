import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../../Services/firebase.service';

import { ToastService, Toast } from '../../Services/toast.service';

@Component({
  selector: 'individualtraining',
  templateUrl: './individualtraining.component.html',
  styleUrls: ['./individualtraining.component.css']
})

export class IndividualtrainingComponent {

    training: any;
    id: string;
    individualid: string;
    private sub: any;

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
           this.individualid = params['individualid'];
           this.firebaseService.setIndividualtraining(this.id, this.individualid);
        });        
    }

    saveTraining(form: any) {
        this.firebaseService.individualtrainingReference.update(form).then(response => {
            this.toastService.addToast("Das Training wurde aktualisiert", "toast-success");
        })
        .catch(error => {
            this.toastService.addToast(error.message, "toast-error");
        });
        this.router.navigate(['/training/' + this.id]);
    }

    deleteTraining() {
        this.firebaseService.individualtrainingReference.remove().then(response => {
            this.toastService.addToast("Das Training wurde gelöscht", "toast-success");
        })
        .catch(error => {
            this.toastService.addToast(error.message, "toast-error");
        });
        this.router.navigate(['/training/' + this.id]);
    }

}