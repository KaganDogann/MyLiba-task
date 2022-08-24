
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './core/components/user-management/user-management.component';

const routes: Routes = [
  {path:"" ,pathMatch:"full", component: UserManagementComponent},
  { path: "test/:id", component: UserManagementComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
