import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutationInfoItemComponent } from './recrutation-info-item.component';

describe('RecrutationInfoItemComponent', () => {
  let component: RecrutationInfoItemComponent;
  let fixture: ComponentFixture<RecrutationInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutationInfoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutationInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
