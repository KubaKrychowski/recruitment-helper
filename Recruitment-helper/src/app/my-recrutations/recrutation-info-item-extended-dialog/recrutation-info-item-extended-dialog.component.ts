import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recrutation-info-item-extended-dialog',
  templateUrl: './recrutation-info-item-extended-dialog.component.html',
  styleUrls: ['./recrutation-info-item-extended-dialog.component.scss']
})
export class RecrutationInfoItemExtendedDialogComponent implements OnInit {
  modalRef?: BsModalRef;
  public recrutationInfo: any;
  constructor() { }

  ngOnInit(): void {

  }

}
