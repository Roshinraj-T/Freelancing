import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'home',
    pathMatch: 'full'
  },{
    path : 'home',
    component : LandingPageComponent
  }
  ,{
    path : 'gighub',
    loadChildren : () => import('./registration/registration.module').then(m => m.RegistrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
