import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FirebaseService } from '../../Services/firebase.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        public firebaseService: FirebaseService
    ) {
        this.titleService.setTitle('Login - BSTP');
        console.log(firebaseService.trainers);
    }

    login(form: any): void {
        this.firebaseService.login(form.email, form.password);
        console.log(this.firebaseService.afAuth.auth.currentUser.email);
    }
}