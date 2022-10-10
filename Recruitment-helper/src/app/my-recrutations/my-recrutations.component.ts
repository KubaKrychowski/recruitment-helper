import { Component, OnInit } from '@angular/core';
import { RecrutationService } from '../services/recrutation.service';

@Component({
  selector: 'app-my-recrutations',
  templateUrl: './my-recrutations.component.html',
  styleUrls: ['./my-recrutations.component.scss'],
})
export class MyRecrutationsComponent implements OnInit {
  recrutations: any = [];
  constructor(
    public recrutationService: RecrutationService
  ) {
    this.recrutationService.refreshListing();
  }

  ngOnInit(): void {
    this.recrutationService.refreshListingHandler.subscribe(() => {
      this.recrutationService.refreshListing();
    })
  }
}
