import { Component, OnInit } from '@angular/core';
import { API_LIST } from 'src/app/core/apiList';
import { IJobs } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit{
  jobs  : IJobs[] = [];
  constructor (
    private apiService : ApiServiceService
  ) {

  }
  ngOnInit(): void {
    this.getMyJobs();
  }
  getMyJobs() {
    let userId: string | null = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getById(API_LIST.getMyJobs, userId).subscribe(
        {
          next: (response) => {
            console.log(response);
          }, error: (err: Error) => {
            console.log(err);
          }
        })
    }
  }

}
