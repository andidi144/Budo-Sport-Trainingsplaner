import { Component } from '@angular/core';

import { FirebaseService } from './Services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    navExtended: boolean = false;

    constructor(
        public firebaseService: FirebaseService
    ) {

    }

    logout() {
        this.firebaseService.logout();
    }
}
