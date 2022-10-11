import { MenuItemModel } from './../models/menu-item.model';
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

  //? menu-items
  private readonly menuItemsArray: MenuItemModel[] = [
    {
      name: 'Home',
      iconClass: 'bi bi-house-door',
      url: 'home'
    },
    {
      name: 'My recrutations',
      iconClass: 'bi bi-list-columns-reverse',
      url: 'my-recrutations'
    },
    {
      name: 'Calendar',
      iconClass: 'bi bi-calendar-date',
      url: '/'
    },
    {
      name: 'Notes',
      iconClass: 'bi bi-sticky',
      url: '/'
    },
  ]
  public get _workTypes(): string[] {
    return this.workTypes;
  }

  public get _employmentTypes(): string[] {
    return this.employmentTypes;
  }

  public get _extraCheckboxesArray(): ExtranInformationCheckboxModel[] {
    return this.extraCheckboxesArray;
  }

  public get _menuItemsArray(): MenuItemModel[] {
    return this.menuItemsArray;
  }
}
