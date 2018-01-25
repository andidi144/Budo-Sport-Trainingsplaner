import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { FirebaseService } from '../Services/firebase.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  canActivate() {
    if(this.firebaseService.afAuth.auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}