import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'post-a-job',
    pathMatch : 'full'
  },
  {
    path : 'post-a-job',
    component : PostAJobComponent
  },{
    path : 'my-jobs',
    component : MyJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
