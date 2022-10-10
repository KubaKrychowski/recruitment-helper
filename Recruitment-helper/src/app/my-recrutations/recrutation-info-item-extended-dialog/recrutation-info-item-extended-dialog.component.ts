import { DictionaryService } from './../../shared/dictionary/dictionary.service';
import { NewRecrutationDto } from './../../shared/models/newRecrutationDto';
import { AfterViewInit, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RecrutationService } from 'src/app/services/recrutation.service';

@Component({
  selector: 'app-recrutation-info-item-extended-dialog',
  templateUrl: './recrutation-info-item-extended-dialog.component.html',
  styleUrls: ['./recrutation-info-item-extended-dialog.component.scss'],
})
export class RecrutationInfoItemExtendedDialogComponent
  implements AfterViewInit
{
  isMenuExpanded: boolean = false;
  public recrutationInfo!: NewRecrutationDto;
  constructor(
    private dict: DictionaryService,
    private recrutationService: RecrutationService,
    private bsModalService: BsModalService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.recrutationInfo.employmentType =
        this.dict._employmentTypes[Number(this.recrutationInfo.employmentType)];
    });
  }

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  closeRecrutation(): void {
    this.recrutationService.closeRecrutation(this.recrutationInfo.externalId);
    this.bsModalService.hide();
  }

  ngOnDestroy(): void {
    this.recrutationService.refreshListingHandler.next(true);
  }
}
