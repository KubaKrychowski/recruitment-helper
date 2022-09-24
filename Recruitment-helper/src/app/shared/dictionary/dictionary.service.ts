import { Injectable } from '@angular/core';
import { ExtranInformationCheckboxModel } from '../models/extra-information-checkbox.model';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private readonly workTypes: string[] = ['Hybrid', 'Onsite', 'Remote'];
  private readonly employmentTypes: string[] = [
    'Employment contract',
    'Order contract',
    'contract for performance of a specific task',
    'B2B',
  ];
  
  //? custom benefits/informations in add recrutation form
  private readonly extraCheckboxesArray: ExtranInformationCheckboxModel[] = [
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

  public get _workTypes(): string[] {
    return this.workTypes;
  }

  public get _employmentTypes(): string[] {
    return this.employmentTypes;
  }

  public get _extraCheckboxesArray(): ExtranInformationCheckboxModel[] {
    return this.extraCheckboxesArray;
  }
}
