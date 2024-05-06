import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { API_LIST } from 'src/app/core/apiList';
import { IJobs, IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';

@Component({
  selector: 'app-my-works',
  templateUrl: './my-works.component.html',
  styleUrls: ['./my-works.component.scss']
})
export class MyWorksComponent implements OnInit{

  jobStatus : IMaster[] = [
    {
      id:1,
      name : 'Pending Applications',
      color : '#3498db'
    },
    {
      id:2,
      name : 'In Progress',
      color: '#f39c12'
    },
    {
      id:3,
      name : 'Completed Work',
      color : '#2ecc71'
    },
  ];
  selectedStatus : number = 0;
  jobs : IJobs[] = [];
  constructor (
    private apiService :ApiServiceService,
    private utilityService :UtilServiceService
  ){

  }
  ngOnInit(): void {
    this.getFreelancerWorks();
  }
  getFreelancerWorks(){
    let userId = localStorage.getItem('userId')
    if(userId){
      this.apiService.getById(API_LIST.getFreelancerWork,userId).subscribe({
        next : (response) =>{
          response.data.map((d:IJobs)=>d.date =  moment(d.date).fromNow())
          this.jobs = response.data
        }, error: (err) => {
          this.utilityService.showError('Request Failed',err.error.message)
        }
      })
    }
  }
}
