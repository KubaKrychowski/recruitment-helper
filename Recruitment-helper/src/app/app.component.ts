import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Recruitment-helper';
}

//TODO: Add guards
//TODO: Add JWT authorizaton
//TODO: Try to use ngRx for example to hold recrutations
//TODO: Use local storage to hold apiKey 
