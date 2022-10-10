import { NotificationStatusEnum } from './../shared/models/notification.model';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '../shared/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  //* notification will be always exist when component is initialized because of condition on its declaration
  @Input() notification!: NotificationModel;

  notificationStatusEnum = NotificationStatusEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
