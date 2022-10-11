import { DictionaryService } from './../shared/dictionary/dictionary.service';
import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../shared/models/menu-item.model';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.scss']
})
export class MobileNavBarComponent implements OnInit {
  public menuItems: MenuItemModel[] | null = null;

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.menuItems = this.dictionaryService._menuItemsArray;
  }

}
