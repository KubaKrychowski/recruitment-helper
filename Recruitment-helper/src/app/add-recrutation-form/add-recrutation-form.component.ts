import { v4 } from 'uuid';
import { ApiService } from './../services/api.service';
import { ConfirmChangesDialogComponent } from './confirm-changes-dialog/confirm-changes-dialog.component';
import { ExtranInformationCheckboxModel } from './../shared/models/extra-information-checkbox.model';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-recrutation-form',
  templateUrl: './add-recrutation-form.component.html',
  styleUrls: ['./add-recrutation-form.component.scss'],
})
export class AddRecrutationFormComponent {
  public readonly extraCheckboxesArray: Array<ExtranInformationCheckboxModel> =
    [
      {
        label: 'micro-services/micro-frontends',
        formControlName: 'architecture',
      },
      {
        label: 'exclusive',
        formControlName: 'exclusive',
      },
      {
        label: 'holiday',
        formControlName: 'holiday',
      },
      {
        label: 'is extra paid (if exclusive)',
        formControlName: 'isExtraPaid',
      },
    ];
  private basicInformations: FormGroup = new FormGroup({
    companyName: new FormControl(null, Validators.required),
    companyDescription: new FormControl(null),
    position: new FormControl(null, Validators.required),
    recruitersName: new FormControl(null),
    websiteUrl: new FormControl(null),
  });

  public get basicInformationsForm(): FormGroup {
    return this.basicInformations;
  }

  public onloading: boolean = false;

  private workOrganizationInformations: FormGroup = new FormGroup({
    workType: new FormControl(null, Validators.required),
    workLang: new FormControl(null, Validators.required),
  });

  public get workOrganizationInformationsForm(): FormGroup {
    return this.workOrganizationInformations;
  }

  private recrutationInformations: FormGroup = new FormGroup({
    recrutationLanguage: new FormControl(null, Validators.required),
    meetingDate: new FormControl(null, Validators.required),
    meetingHour: new FormControl(null, Validators.required),
    rangedSalary: new FormControl(null),
    minSalary: new FormControl(null),
    maxSalary: new FormControl(null),
    employmentType: new FormControl(null, Validators.required),
  });

  public get recrutationInformationsForm(): FormGroup {
    return this.recrutationInformations;
  }

  private extraInformations = new FormGroup({
    comments: new FormControl(null),
  });

  public get extraInformationsForm(): FormGroup {
    return this.extraInformations;
  }

  private readonly form: FormGroup = new FormGroup({
    basicInformations: this.basicInformations,
    workOrganizationInformations: this.workOrganizationInformations,
    recrutationInformations: this.recrutationInformations,
    extraInformations: this.extraInformations,
  });

  public get _form(): FormGroup {
    return this.form;
  }

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public router: Router,
    private apiService: ApiService
  ) {
    for (
      let controlIndex = 0;
      controlIndex < this.extraCheckboxesArray.length;
      controlIndex++
    ) {
      const controlName =
        this.extraCheckboxesArray[controlIndex].formControlName;
      this.extraInformations.addControl(controlName, new FormControl(null));
    }
  }

  onSubmit(): void {
    this._form.markAllAsTouched();

    if (this._form.valid) {
      let tempControls = [];
      let newRecrutationDto: any = {};
      let recrutationInformations = this._form.controls[
        'recrutationInformations'
      ] as FormGroup;
      let meetingDate = recrutationInformations.controls['meetingDate']
        .value as Date;
      let meetingHour = recrutationInformations.controls['meetingHour']
        .value as Date;
      for (const field in this._form.controls) {
        const controlsArray = this._form.get(field)?.value;

        //*iterate over all controls
        for (const [controlName, controlValue] of Object.entries(
          controlsArray
        )) {
          if (controlName === 'meetingDate') {
            newRecrutationDto['meetingDateAndHour'] = this.setDateTime(
              meetingDate,
              meetingHour
            );
          } else {
            newRecrutationDto[controlName] = controlValue;
          }

          if (controlValue === null) {
            tempControls.push(controlName);
          }
        }
      }

      this.openConfirmationDialog(tempControls);
      this.bsModalRef.content.onClose.subscribe((res: boolean) => {
        if (res) {
          newRecrutationDto['recrutationExternalId'] = v4();
          this.apiService
            .sendPostRequest(newRecrutationDto)
            .pipe(
              catchError(this.errorHandler),
              tap((result) => {
                console.log(result);
                this.router.navigate(['/home']);
              })
            )
            .subscribe(() => {
              return;
            });
        } else {
          return;
        }
      });
    } else {
      //TODO: add notification wrong data or smth like that
    }
  }

  private openConfirmationDialog(data: any) {
    const initialState: ModalOptions = {
      initialState: {
        emptyControlsArray: data,
        title: 'confirm changes',
        class: 'modal-lg',
      },
    };

    this.bsModalRef = this.modalService.show(
      ConfirmChangesDialogComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
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

  setDateTime(date: Date, time: Date) {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());

    return date;
  }
}
