import { UserService } from './../services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public get isUserAuthenticated(): boolean {
    return this.apiService.isUserAuthenticated;
  }

  public username: string | null = null;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = null;
      }
    });
  }

  public onSignOut(): void {
    this.userService.signOut();
  }
}
