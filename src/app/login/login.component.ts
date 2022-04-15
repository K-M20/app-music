import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  messageError: string = "";

  constructor(private _formB: FormBuilder) {
    this.userForm = this._formB.group({
      mail: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    this.userForm.valueChanges.subscribe((changes) => {
      console.log(changes);
    })
  }

  ngOnInit(): void {
  }

  validPattern(pattern: any) {
    console.log(pattern.actualValue.match(pattern.requiredPattern));
    return (pattern) ? pattern.actualValue.match(pattern.requiredPattern) : false
  }

  validInput(name: string, errorName: string) {
    return this.userForm.get(name)?.dirty && this.userForm.get(name)?.hasError(errorName)
  }

  senForm() {
    console.log("-----", this.userForm.value)
  }
}

