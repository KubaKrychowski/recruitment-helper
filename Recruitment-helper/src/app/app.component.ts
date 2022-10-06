import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
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
  constructor(private notificationService: NotificationService,private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.setupNotificationService();
    if(localStorage.getItem('token')){
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
    this.apiService.checkAndRefreshJWT(localStorage.getItem('token')!).subscribe(userDto => {
      if(userDto){
        this.userService.currentUser.next(userDto);
        this.apiService.token = userDto.token;
      }
    })
  }
}

//TODO: Add guards
//TODO: Try to use ngRx for example to hold recrutations
//TODO: Find good way for error handling (best solution is to use RxJS)
