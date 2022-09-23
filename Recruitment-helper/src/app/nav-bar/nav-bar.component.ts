import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router) { }

  //TODO: Use [routerLink] in HTML instead of router.navigate()
  goToHomePage(): void {
    this.router.navigate(['home']);
  }

  goToRecruPage(): void {
    this.router.navigate(['my-recrutations']);
  }

  goToLoginPage(): void {
    this.router.navigate(['log-in']);
  }

}
