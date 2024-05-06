import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { API_LIST } from 'src/app/core/apiList';
import { IApplicant, IJobs, IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit{
  jobs  : IJobs[] = [];
  jobStatus : IMaster[] = [
    {
      id:1,
      name : 'Posted Jobs',
      color : '#3498db'
    },
    {
      id:2,
      name : 'In Progress',
      color: '#f39c12'
    },
    {
      id:3,
      name : 'Completed Jobs',
      color : '#2ecc71'
    },
    {
      id:4,
      name : 'Inactive Jobs',
      color : '#7f8c8d'
    }
  ];
  selectedStatus : number = 0;
  applicantDetails: IApplicant[] = [];
  applicantVisible : boolean = false;

  constructor (
    private apiService : ApiServiceService,
    private utilityService : UtilServiceService
  ) {

  }
  ngOnInit(): void {
    this.getClientJobs(1);
  }
  getClientJobs(statusId : number) {
    let userId: string | null = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getById(API_LIST.getClientJobs, userId ).subscribe(
        {
          next: (response) => {
            response.data.map((d:IJobs)=>d.date =  moment(d.date).fromNow())
            this.jobs = response.data
          }, error: (err) => {
            this.utilityService.showError('Request Failed',err.error.message)
          }
        })
    }
  }
  getApplicantDetails(id:number){
    this.applicantVisible = true;
    this.apiService.getById(API_LIST.getApplicantDetails,id.toString()).subscribe({
      next : (response)=>{
        this.applicantDetails = response.data
      },
      error : (err)=>{
        this.utilityService.showError('Request Failed',err.error.message)
      }
    })
  }
  acceptApplication(freelancerId: number,jobId : number){
    let data = {
      freelancerId,
      jobId
    }
    this.apiService.post(API_LIST.acceptApplication,data).subscribe({
      next : (response)=>{
        this.applicantVisible  = false;
        this.jobs[this.jobs.findIndex(d=>d.id == jobId)].freelancerId = freelancerId;
        this.utilityService.showSuccess('Request Success',response.message)
      },
      error : (err)=>{
        this.utilityService.showError('Request Failed',err.error.message)
      }
    })
  }

}
