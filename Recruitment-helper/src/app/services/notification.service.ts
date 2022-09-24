import { NotificationModel } from './../shared/models/notification.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationsHandler: Subject<NotificationModel | null> = new Subject<NotificationModel | null>();

  constructor() { }
}
