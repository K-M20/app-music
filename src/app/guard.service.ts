import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private aS: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | boolean {
    if (this.aS.authenticated()) {
      console.log('login...');
      return true;
    }
    if (this.aS.authenticated() == false) {
      console.log('no login...');
      this.router.navigate(['/login'], {
        queryParams: { messageError: 'Error authentification' }
      });
    }
  }
}
