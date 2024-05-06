import { Component } from '@angular/core';
import * as moment from 'moment';
import { API_LIST } from 'src/app/core/apiList';
import { IJobs } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';
@Component({
  selector: 'app-find-a-job',
  templateUrl: './find-a-job.component.html',
  styleUrls: ['./find-a-job.component.scss']
})
export class FindAJobComponent {
  jobs  : IJobs[] = [];
  constructor (
    private apiService : ApiServiceService,
    private utilityService  : UtilServiceService
  ) {

  }
  ngOnInit(): void {
    this.getAllJobs();
  }
  getAllJobs() {
      let data = {
        userId : localStorage.getItem('userId')
      }
      this.apiService.get(API_LIST.getAllJobs,data).subscribe(
        {
          next: (response) => {
            response.data.map((d:IJobs)=>d.date =  moment(d.date).fromNow())
            this.jobs = response.data
            console.log(this.jobs);
            
          }, error: (err: Error) => {
            console.log(err);
          }
        })
    }
    applyJobAction(id:number){
      let data = {
        jobId : id,
        freelancerId : localStorage.getItem('userId'),
        isApplied : 1
      }
      this.apiService.post(API_LIST.applyJob,data).subscribe(
        {
          next : (response)=>{
            this.jobs[this.jobs.findIndex(d=>d.id == response.data.jobId)].isApplied = '1'
          },
          error: (err) => {
            console.log(err);
            
            this.utilityService.showError(' Job Application Error', err.error.message);
          }
        }
      )
    }

}

