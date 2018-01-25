import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'yourTrainings',
  templateUrl: './yourTrainings.component.html',
  styleUrls: ['./yourTrainings.component.css']
})

export class YourTrainingsComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) {
        this.titleService.setTitle('Your trainings - BSTP');
    }

}