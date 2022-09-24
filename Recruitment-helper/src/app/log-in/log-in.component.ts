import { NotificationStatusEnum, NotificationClassEnum } from './../shared/models/notification.model';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { Location } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private location: Location,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  identityUser() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.apiService
        .sendLogInRequest({
          login: this.loginForm.controls['login'].value,
          password: this.loginForm.controls['password'].value,
        })
        .pipe(
          //! catchError(this.errorHandler),
          tap((result) => {
            if (result) {
              this.location.back();
            }
          })
        )
        .subscribe(() => {
          return;
        });
    } else {
      const notification = {
        title: 'Wrong login or password',
        status: NotificationStatusEnum.Failed,
        cssClass: NotificationClassEnum.Failed
      }
      this.loginForm.reset();
      this.notificationService.notificationsHandler.next(notification)
    }
  }
}
