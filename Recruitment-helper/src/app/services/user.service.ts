import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SimplifiedUserDataModel } from '../shared/models/simplified-user-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: Subject<SimplifiedUserDataModel | null> =
    new Subject<SimplifiedUserDataModel | null>();

  constructor(private apiService: ApiService,private router: Router) {}

  public signOut(): void {
    this.apiService.token = null;
    this.currentUser.next(null);
    this.router.navigate(['/home']);
  }
}
