import { RecrutationInfoItemExtendedDialogComponent } from './../recrutation-info-item-extended-dialog/recrutation-info-item-extended-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recrutation-info-item',
  templateUrl: './recrutation-info-item.component.html',
  styleUrls: ['./recrutation-info-item.component.scss'],
})
export class RecrutationInfoItemComponent implements OnInit {
  @Input() recrutation: any = null;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  public openMoreInformationsDialog(): void {
    this.modalRef = this.modalService.show(RecrutationInfoItemExtendedDialogComponent);
    this.modalRef.content.recrutationInfo = this.recrutation;
  }
}
