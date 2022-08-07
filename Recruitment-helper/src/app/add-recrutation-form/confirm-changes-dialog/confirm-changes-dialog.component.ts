import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-changes-dialog',
  templateUrl: './confirm-changes-dialog.component.html',
  styleUrls: ['./confirm-changes-dialog.component.scss']
})
export class ConfirmChangesDialogComponent {
  public emptyControlsArray: any[] = [];
  private confirmed: boolean = false;
  onClose: Subject<boolean> = new Subject();
  constructor(public bsModalRef: BsModalRef) { }

  confirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  decline(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
