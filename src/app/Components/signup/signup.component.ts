import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FirebaseService } from '../../Services/firebase.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        public firebaseService: FirebaseService
    ) {
        this.titleService.setTitle('Signup - BSTP');
    }

    signup(form: any): void {
        console.log(form);
        if(form.password == form.repeatpassword) {
            this.firebaseService.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password).then(response =>{
                console.log(response);
            });
        }
    }

}