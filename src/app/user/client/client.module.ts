import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { MyWorkersComponent } from './my-workers/my-workers.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    MyWorkersComponent,
    MyJobsComponent,
    PostAJobComponent    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
