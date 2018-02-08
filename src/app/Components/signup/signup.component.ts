import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FirebaseService } from '../../Services/firebase.service';

import { ToastService, Toast } from '../../Services/toast.service';

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
        public firebaseService: FirebaseService,
        public toastService: ToastService
    ) {
        this.titleService.setTitle('Signup - BSTP');
    }

    signup(form: any): void {
        if(form.password == form.repeatpassword) {
            this.firebaseService.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password).then(response => {
                this.toastService.addToast("Der Account wurde erstellt", "toast-success");
                this.router.navigate(['/yourTrainings']);
            })
            .catch(error => {
                this.toastService.addToast(this.firebaseService.errorTranslation[error.code], "toast-error");
            });
        }
        else {
            this.toastService.addToast("Die Passwörter stimmen nicht überein", "toast-error");            
        }
    }

}