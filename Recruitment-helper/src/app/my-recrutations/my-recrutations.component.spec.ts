import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecrutationsComponent } from './my-recrutations.component';

describe('MyRecrutationsComponent', () => {
  let component: MyRecrutationsComponent;
  let fixture: ComponentFixture<MyRecrutationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecrutationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecrutationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
