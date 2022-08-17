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
  constructor(private apiService: ApiService) {}

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

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
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
