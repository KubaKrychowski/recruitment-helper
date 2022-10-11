import { NotificationService } from './notification.service';
import { NewRecrutationDto } from './../shared/models/newRecrutationDto';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, Subject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { NotificationClassEnum, NotificationStatusEnum } from '../shared/models/notification.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecrutationService {
  public refreshListingHandler: Subject<boolean> = new Subject();
  public recrutations: Subject<Array<any>> = new Subject();
  public isFetching: boolean = false;
  constructor(
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  closeRecrutation(externalId: string) {
    this.apiService
      .sendDeleteRequest(`recrutations/${externalId}`)
      .subscribe((res) => {
        console.log(res);
      });
  }

  refreshListing(): void {
    this.isFetching = true;
    this.apiService
      .sendGetRequest(`recrutations/${localStorage.getItem('userExternalId')}`)
      .pipe(
        catchError(this.errorHandlerService.errorHandler),
        tap((result) => {
          let _recrutations = [];
          for (const [key, value] of Object.entries(result)) {
            for (const [_key, _value] of Object.entries(value)) {
              _recrutations.push(_value);
            }
          }

          this.recrutations.next(_recrutations);
          this.isFetching = false;
        })
      )
      .subscribe(() => {
        return;
      });
  }

  addNewRecrutation(newRecrutationDto: NewRecrutationDto): void {
    this.apiService
    .sendPostRequest('recrutations', newRecrutationDto)
    .pipe(
      catchError(this.errorHandlerService.errorHandler),
      tap(() => {
        const result = {
          title: 'Recrutation successfully created',
          status: NotificationStatusEnum.Success,
          cssClass: NotificationClassEnum.Success,
        };

        this.notificationService.notificationsHandler.next(result);
        this.router.navigate(['/home']);
      })
    )
    .subscribe(() => {
      return;
    });
  }
}
