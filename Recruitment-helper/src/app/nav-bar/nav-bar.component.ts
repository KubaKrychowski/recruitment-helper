import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public get isUserAuthenticated(): boolean {
    return this.apiService.isUserAuthenticated;
  }

  constructor(private apiService: ApiService) {}
}
