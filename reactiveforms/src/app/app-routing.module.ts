import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  {path:'',component:ApiComponent},
  {path:'form',component:FormComponent},
  {path:'api',component:ApiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
