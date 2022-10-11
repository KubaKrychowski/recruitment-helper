import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import {
  NotificationClassEnum,
  NotificationModel,
  NotificationStatusEnum,
} from './shared/models/notification.model';
import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notification: NotificationModel | null = null;
  public get isMobile(): boolean {
    return window.innerWidth <= 786;
  }
  constructor(
    private notificationService: NotificationService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setupNotificationService();

    if (localStorage.getItem('token')) {
      this.autoLogin();
    }
  }

  private resetNotification(): void {
    this.notificationService.notificationsHandler.next(null);
  }

  private setupNotificationService(): void {
    this.notificationService.notificationsHandler.subscribe((notification) => {
      this.notification = notification;

      if (notification) {
        setTimeout(() => {
          this.resetNotification();
        }, 2500);
      }
    });
  }

  private autoLogin(): void {
    this.apiService
      .checkAndRefreshJWT(localStorage.getItem('token')!)
      .pipe()
      .subscribe((userDto) => {
        if (userDto.error) {
          const notification = {
            title: 'Authorization token has expired, please login again',
            status: NotificationStatusEnum.Warning,
            cssClass: NotificationClassEnum.Warning,
          };
          this.notificationService.notificationsHandler.next(notification);
        }
        if (userDto.token) {
          this.userService.currentUser.next(userDto);
          this.apiService.token = userDto.token;
        }
      });
  }
}

//!: TODO: Create response model
//TODO: Try to use ngRx for example to hold recrutations

