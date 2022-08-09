import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  constructor() {}

  ngOnInit(): void {}

  identityUser(){
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      //TODO: send request
    } else {
      this.loginForm.reset();
      //TODO: notification wrong email or password
    }
  }
}
