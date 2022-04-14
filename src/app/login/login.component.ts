import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = "";

  constructor(
    private authS: AuthService,
    private router: Router
  ) {
    if (this.authS.authenticated())
      this.router.navigate(['/dashboard'], { queryParams: { message: 'Success' } });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {

    this.authS.auth(form.value['email'], form.value['password']).then(
      () => {
        this.router.navigate(['/dashboard'], { queryParams: { message: 'Success' } });
      }
    ).catch(
      error => {
        this.messageError = 'error Login or password '
      }
    );
  }

}
