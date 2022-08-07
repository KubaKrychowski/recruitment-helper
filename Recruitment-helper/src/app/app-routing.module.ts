import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecrutationFormComponent } from './add-recrutation-form/add-recrutation-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'add-new-recrutation', component: AddRecrutationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
