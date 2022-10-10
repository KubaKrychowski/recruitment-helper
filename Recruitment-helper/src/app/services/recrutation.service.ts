import { ErrorHandlerService } from './error-handler.service';
import { catchError, Subject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecrutationService {
  public refreshListingHandler: Subject<boolean> = new Subject();
  public recrutations: Subject<Array<any>> = new Subject();

  constructor(
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  closeRecrutation(externalId: string) {
    this.apiService
      .sendDeleteRequest(`recrutations/${externalId}`)
      .subscribe((res) => {
        console.log(res);
      });
  }

  refreshListing(): void {
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
        })
      )
      .subscribe(() => {
        return;
      });
  }
}
