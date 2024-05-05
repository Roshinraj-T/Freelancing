import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
const routes: Routes = [
  {
    path : '',
    component : MainLayoutComponent,
    children:[
      {
        path : 'client',
        loadChildren:()=> import('./client/client.module').then(m=>m.ClientModule)
      },{
        path : 'freelancer',
        loadChildren:()=>import('./freelancer/freelancer.module').then( m => m.FreelancerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
