import { NotificationStatusEnum, NotificationClassEnum } from './../shared/models/notification.model';
import { NotificationService } from './../services/notification.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-recrutations',
  templateUrl: './my-recrutations.component.html',
  styleUrls: ['./my-recrutations.component.scss'],
})
export class MyRecrutationsComponent implements OnInit {
  recrutations: any = [];
  constructor(private apiService: ApiService,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getAllRecrutations();
  }

  private getAllRecrutations(): void {
    this.apiService
      .sendGetRequest('AddNewRecrutation')
      .pipe(
        catchError(this.errorHandler),
        tap((result) => {
          this.recrutations = result;
          console.log(this.recrutations);
        })
      )
      .subscribe(() => {
        return;
      });
  }

  //TODO: Create errorHandlerService
  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      const notification = {
        title: error.message,
        status: NotificationStatusEnum.Failed,
        cssClass: NotificationClassEnum.Failed
      }
      this.notificationService.notificationsHandler.next(notification);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
