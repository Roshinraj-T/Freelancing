import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindAJobComponent } from './find-a-job/find-a-job.component';
import { MyWorksComponent } from './my-works/my-works.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'find-a-job',
    pathMatch : 'full'
  },
  {
    path : 'find-a-job',
    component : FindAJobComponent
  },
  {
    path : 'my-works',
    component : MyWorksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule { }
