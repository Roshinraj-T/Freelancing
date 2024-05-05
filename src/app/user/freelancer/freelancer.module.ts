import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FindAJobComponent } from './find-a-job/find-a-job.component';
import { MyWorksComponent } from './my-works/my-works.component';


@NgModule({
  declarations: [
  
    FindAJobComponent,
       MyWorksComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule
  ]
})
export class FreelancerModule { }
