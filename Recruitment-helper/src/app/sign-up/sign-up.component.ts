import { NotificationService } from './../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  NotificationClassEnum,
  NotificationStatusEnum,
} from '../shared/models/notification.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public get isUserAuthenticated(): boolean {
    return this.apiService.isUserAuthenticated;
  }

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private location: Location,
  ) {}

  ngOnInit(): void {}

  public onSubmitForm(): void {
    this.registerForm.markAllAsTouched();

    if (
      this.registerForm.controls['password'].value !==
      this.registerForm.controls['confirmPassword'].value
    ) {
      const notification = {
        title: 'confirmation password is different than original',
        status: NotificationStatusEnum.Failed,
        cssClass: NotificationClassEnum.Failed,
      };

      this.notificationService.notificationsHandler.next(notification);
      return;
    }

    if (this.registerForm.valid) {
      this.apiService
        .sendRegisterRequest({
          email: this.registerForm.controls['email'].value,
          password: this.registerForm.controls['password'].value,
          login: this.registerForm.controls['login'].value,
        })
        .pipe(
          //! catchError(this.errorHandler),
          tap((result) => {
            if (result.token) {
              this.apiService.token = result.token;
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
        cssClass: NotificationClassEnum.Failed,
      };
      this.registerForm.reset();
      this.notificationService.notificationsHandler.next(notification);
    }
  }
}
