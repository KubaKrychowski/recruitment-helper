export interface NotificationModel {
  title: string;
  status: NotificationStatusEnum;
  cssClass: NotificationClassEnum;
}

export enum NotificationStatusEnum {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
}

export enum NotificationClassEnum {
  Success = 'success',
  Failed = 'danger',
  Warning = 'warning',
}
