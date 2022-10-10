import { DictionaryService } from './../../shared/dictionary/dictionary.service';
import { NewRecrutationDto } from './../../shared/models/newRecrutationDto';
import { AfterViewInit, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recrutation-info-item-extended-dialog',
  templateUrl: './recrutation-info-item-extended-dialog.component.html',
  styleUrls: ['./recrutation-info-item-extended-dialog.component.scss'],
})
export class RecrutationInfoItemExtendedDialogComponent
  implements AfterViewInit
{
  modalRef?: BsModalRef;
  public recrutationInfo!: NewRecrutationDto;
  constructor(private dict: DictionaryService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.recrutationInfo.employmentType =
        this.dict._employmentTypes[Number(this.recrutationInfo.employmentType)];
    });
  }
}
