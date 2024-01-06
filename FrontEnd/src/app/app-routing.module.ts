import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = 
[
  //localhost:4200/users
  { 
    path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) 
  },
  //localhost:4200/login
  {
    path:'',component:LoginComponent
  },
  //localhost:4200/dashboard
  {
    path:'dashboard',component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
