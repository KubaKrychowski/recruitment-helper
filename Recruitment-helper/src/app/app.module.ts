import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddRecrutationFormComponent } from './add-recrutation-form/add-recrutation-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeaveConfirmationDialogComponent } from './leave-confirmation-dialog/leave-confirmation-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmChangesDialogComponent } from './add-recrutation-form/confirm-changes-dialog/confirm-changes-dialog.component';
import { MyRecrutationsComponent } from './my-recrutations/my-recrutations.component';
import { RecrutationInfoItemComponent } from './my-recrutations/recrutation-info-item/recrutation-info-item.component';
import { LogInComponent } from './log-in/log-in.component';
import { RecrutationInfoItemExtendedDialogComponent } from './my-recrutations/recrutation-info-item-extended-dialog/recrutation-info-item-extended-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AddRecrutationFormComponent,
    LeaveConfirmationDialogComponent,
    ConfirmChangesDialogComponent,
    MyRecrutationsComponent,
    RecrutationInfoItemComponent,
    LogInComponent,
    RecrutationInfoItemExtendedDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BsModalService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
