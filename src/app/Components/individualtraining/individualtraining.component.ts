import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseService } from '../../Services/firebase.service';

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
        public firebaseService: FirebaseService
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

}