import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FirebaseService } from '../../Services/firebase.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        public firebaseService: FirebaseService
    ) {
        this.titleService.setTitle('Settings - BSTP');
    }

    changePassword(form: any): void {
        if(form.password == form.repeatpassword) {
            // this.firebaseService.afAuth.auth.currentUser.updatePassword("TestPassw0rd!").then(response =>{
            //     console.log(response);
            // });
            console.log(form);
            this.firebaseService.afAuth.auth.currentUser.updatePassword(form.password).then(response =>{
                this.router.navigate(['/yourTrainings']);
            });
        }
    }

}