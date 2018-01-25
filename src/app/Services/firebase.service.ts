import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  
  public user: Observable<firebase.User>;
  public trainers: AngularFireList<any[]>;

  constructor(
    public afAuth: AngularFireAuth, 
    public db: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
    this.trainers = db.list('trainers');
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}