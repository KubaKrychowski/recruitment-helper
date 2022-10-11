import { RecrutationService } from 'src/app/services/recrutation.service';
import { DictionaryService } from './../shared/dictionary/dictionary.service';
import { v4 } from 'uuid';
import { ConfirmChangesDialogComponent } from './confirm-changes-dialog/confirm-changes-dialog.component';
import { ExtranInformationCheckboxModel } from './../shared/models/extra-information-checkbox.model';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import {
  NotificationClassEnum,
  NotificationStatusEnum,
} from '../shared/models/notification.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-recrutation-form',
  templateUrl: './add-recrutation-form.component.html',
  styleUrls: ['./add-recrutation-form.component.scss'],
})
export class AddRecrutationFormComponent {
  public onloading: boolean = false;

  //* Definitions for form controls
  public workTypes: string[] = [];
  public employmentTypes: string[] = [];
  public extraCheckboxesArray: ExtranInformationCheckboxModel[] = [];

  // form groups
  private basicInformations: FormGroup = new FormGroup({
    companyName: new FormControl(null, Validators.required),
    companyDescription: new FormControl(null),
    position: new FormControl(null, Validators.required),
    recruitersName: new FormControl(null),
    websiteUrl: new FormControl(null),
  });
  private workOrganizationInformations: FormGroup = new FormGroup({
    workType: new FormControl(null, Validators.required),
    workLang: new FormControl(null, Validators.required),
  });
  private recrutationInformations: FormGroup = new FormGroup({
    recrutationLanguage: new FormControl(null, Validators.required),
    meetingDate: new FormControl(null, Validators.required),
    meetingHour: new FormControl(null, Validators.required),
    rangedSalary: new FormControl(null),
    minSalary: new FormControl(null),
    maxSalary: new FormControl(null),
    employmentType: new FormControl(null, Validators.required),
  });
  private extraInformations = new FormGroup({
    comments: new FormControl(null),
  });
  private readonly form: FormGroup = new FormGroup({
    basicInformations: this.basicInformations,
    workOrganizationInformations: this.workOrganizationInformations,
    recrutationInformations: this.recrutationInformations,
    extraInformations: this.extraInformations,
  });
  //form groups getters
  public get basicInformationsForm(): FormGroup {
    return this.basicInformations;
  }
  public get workOrganizationInformationsForm(): FormGroup {
    return this.workOrganizationInformations;
  }
  public get recrutationInformationsForm(): FormGroup {
    return this.recrutationInformations;
  }
  public get extraInformationsForm(): FormGroup {
    return this.extraInformations;
  }
  public get _form(): FormGroup {
    return this.form;
  }

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public router: Router,
    private dictionaryService: DictionaryService,
    private notificationService: NotificationService,
    private recrutationService: RecrutationService
  ) {
    this.workTypes = this.dictionaryService._workTypes;
    this.employmentTypes = this.dictionaryService._employmentTypes;
    this.extraCheckboxesArray = this.dictionaryService._extraCheckboxesArray;

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

  public onSubmit(): void {
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
      this.bsModalRef.content.onClose.subscribe((response: boolean) => {
        if (response) {
          newRecrutationDto['externalId'] = v4();
          newRecrutationDto['userExternalId'] =
            localStorage.getItem('userExternalId');
          this.recrutationService.addNewRecrutation(newRecrutationDto);
        } else {
          return;
        }
      });
    } else {
      const notification = {
        title: 'Form has got incorrect values',
        status: NotificationStatusEnum.Failed,
        cssClass: NotificationClassEnum.Failed,
      };
      this.notificationService.notificationsHandler.next(notification);
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

  private setDateTime(date: Date, time: Date) {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());

    return date;
  }
}
