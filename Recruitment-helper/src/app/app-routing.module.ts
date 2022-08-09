import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecrutationFormComponent } from './add-recrutation-form/add-recrutation-form.component';
import { HomeComponent } from './home/home.component';
import { MyRecrutationsComponent } from './my-recrutations/my-recrutations.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'add-new-recrutation', component: AddRecrutationFormComponent },
  { path: 'my-recrutations', component: MyRecrutationsComponent },
  { path: 'log-in', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
