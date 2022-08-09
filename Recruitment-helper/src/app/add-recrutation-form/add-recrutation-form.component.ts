import { v4 } from 'uuid';
import { NewRecrutationDto } from './../shared/models/newRecrutationDto';
import { ApiService } from './../services/api.service';
import { ConfirmChangesDialogComponent } from './confirm-changes-dialog/confirm-changes-dialog.component';
import { ExtranInformationCheckboxModel } from './../shared/models/extra-information-checkbox.model';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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
    private router: Router,
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
      let newRecrutationDto: any = { recrutationExternalId: v4() };
      for (const field in this._form.controls) {
        const controlsArray = this._form.get(field)?.value;

        //*iterate over all controls
        for (const [controlName, controlValue] of Object.entries(
          controlsArray
        )) {
          newRecrutationDto[controlName] = controlValue;

          if (controlValue === null) {
            tempControls.push(controlName);
          }
        }
      }
      this.openConfirmationDialog(tempControls);
      this.bsModalRef.content.onClose.subscribe((res: boolean) => {
        if (res) {
          this.apiService.sendPostRequest(newRecrutationDto).subscribe(res => console.log(res));

          this.router.navigate(['/home']);
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
}
