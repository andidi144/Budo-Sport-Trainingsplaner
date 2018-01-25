import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) {
        this.titleService.setTitle('Signup - BSTP');
    }

}