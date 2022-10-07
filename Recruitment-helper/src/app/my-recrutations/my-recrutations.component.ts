import { ErrorHandlerService } from './../services/error-handler.service';
import { NotificationService } from './../services/notification.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-my-recrutations',
  templateUrl: './my-recrutations.component.html',
  styleUrls: ['./my-recrutations.component.scss'],
})
export class MyRecrutationsComponent implements OnInit {
  recrutations: any = [];
  constructor(
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getAllRecrutations();
  }

  private getAllRecrutations(): void {
    this.apiService
      .sendGetRequest('recrutations')
      .pipe(
        catchError(this.errorHandlerService.errorHandler),
        tap((result) => {
          for (const [key, value] of Object.entries(result)) {
            for (const [_key, _value] of Object.entries(value)) {
              this.recrutations.push(_value);
            }
          }
        })
      )
      .subscribe(() => {
        return;
      });
  }
}
