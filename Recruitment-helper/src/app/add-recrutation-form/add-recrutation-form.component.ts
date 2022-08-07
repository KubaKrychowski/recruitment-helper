import { ExtranInformationCheckboxModel } from './../shared/models/extra-information-checkbox.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-recrutation-form',
  templateUrl: './add-recrutation-form.component.html',
  styleUrls: ['./add-recrutation-form.component.scss'],
})
export class AddRecrutationFormComponent implements OnInit {
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
        label: 'is extra paid (if exlusive)',
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

  constructor() {
    for (
      let controlIndex = 0;
      controlIndex < this.extraCheckboxesArray.length;
      controlIndex++
    ) {
      const controlName =
        this.extraCheckboxesArray[controlIndex].formControlName;
      this.extraInformations.addControl(
        controlName,
        new FormControl(null)
      );
    }
  }
  ngOnInit(): void {}
}
