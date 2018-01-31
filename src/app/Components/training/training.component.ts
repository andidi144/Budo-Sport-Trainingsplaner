import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../../Services/firebase.service';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

export class TrainingComponent {

    training: any;
    id: string;
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
        public firebaseService: FirebaseService
    ) {
        this.titleService.setTitle('Training - BSTP');
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.firebaseService.setTraining(this.id);
        });
    }

    formatDate(date: Date) {
        return date.getDate() + '.' + (date.getMonth() + 2) + '.' + date.getFullYear();
    }
}