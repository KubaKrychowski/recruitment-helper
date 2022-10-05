import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SimplifiedUserDataModel } from '../shared/models/simplified-user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: Subject<SimplifiedUserDataModel> =
    new Subject<SimplifiedUserDataModel>();
    
  constructor() {}
}
