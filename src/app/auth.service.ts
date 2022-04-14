import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: boolean = false;

  constructor(private router: Router, public authentification: AngularFireAuth) {
    this.authentification.onAuthStateChanged((user) => {
      if (user) {
        this.authState = true;
      } else {
        this.authState = false;
      }
    });
  }

  auth(email: string, password: string): Promise<any> {

    return this.authentification.signInWithEmailAndPassword(email, password);
  }

  logout() {

    this.authentification.signOut().then(
      () => {
        this.router.navigate(['/albums'], { queryParams: { message: `Success logout` } });
      }
    );
  }

  // Return true if user is logged in
  authenticated(): boolean {
    return this.authState == true;
  }
}
