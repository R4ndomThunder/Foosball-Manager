import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  NOTIFICATION_API = "https://fcm.googleapis.com/fcm/send/AAAAiyhnRa4:APA91bFedexT9Kmeub9IrXi_RJI4ZUNPeIe_8_uZCp9LrcTdddM5_nLOfXzVuzt0_d4uJPydYFE2hRLPTUldYH9pKagCRXvsdFJ6doL-Qfi7cIDS1lVNSN2A9ri3dUPCAEr6hJZiVRWZ";

  constructor() { }

}
