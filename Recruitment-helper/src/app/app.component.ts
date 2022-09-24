import { NotificationModel } from './shared/models/notification.model';
import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notification: NotificationModel | null = null;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notificationsHandler.subscribe((notification) => {
      console.log(notification);

      this.notification = notification;

      if (notification) {
        setTimeout(() => {
          this.resetNotification();
        }, 2000);
      }
    });
  }

  private resetNotification(): void {
    this.notificationService.notificationsHandler.next(null);
  }
}

//TODO: Add guards
//TODO: Add JWT authorizaton
//TODO: Try to use ngRx for example to hold recrutations
//TODO: Use local storage to hold apiKey
//TODO: Find good way for error handling (best solution is to use RxJS)
