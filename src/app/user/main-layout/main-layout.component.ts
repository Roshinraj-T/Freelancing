import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import { API_LIST } from 'src/app/core/apiList';
import { IJobs, IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  userId : string | null = '';
  userName : string | null = '';
  notificationVisible : boolean = false;
  job !:IJobs;
  clientTabs: IMaster[] = [
    {
      id: 1,
      name: 'Post a job',
      route : 'client/post-a-job'
    },
    {
      id: 2,
      name: 'My Jobs',
      route : 'client/my-jobs'
    },
    // {
    //   id: 3,
    //   name: 'My fav workers',
    //   // route : ''
    // }
  ];
  freelancerTabs : IMaster[] = 
  [
    {
      id: 1,
      name: 'Find a job',
      route : 'freelancer/find-a-job'
    },
    {
      id: 2,
      name: 'My works',
      route : 'freelancer/my-works'
    }];
  tabs : IMaster[] = [];
  selectedTab !: number;
  constructor (
    private router : Router,
    private apiService : ApiServiceService,
    private utilityService :UtilServiceService
  ){

  }
  ngOnInit(): void {
    if(localStorage.getItem('roleId') && (localStorage.getItem('roleId') == '1')){
      this.tabs = this.clientTabs;
    } else{
      this.socket();
      this.tabs = this.freelancerTabs;
    }
    this.selectedTab  = this.tabs.findIndex(d=>d.route?.split('/')[d.route?.split('/').length -1] == this.router.url.split('/')[this.router.url.split('/').length -1])
    
    if(localStorage.getItem('userName')){
      this.userName = localStorage.getItem('userName')
    }
  }
  redirectToProfile(){
  }
  socket() {
    const socket = io(environment.socketUrl);
    socket?.on("notification", (data: any) => {
      let userDetails = {
        userId : localStorage.getItem('userId')
      }
      this.apiService.get(API_LIST.getNotification,userDetails).subscribe({
        next:(response)=>{
          this.job = response.data;
          this.job.date = moment(this.job.date).fromNow()
          this.notificationVisible = true;
        },
        error : (err)=>{
          this.utilityService.showError('Notification Error',err.error.message)
        }
      })

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
          if(this.job.id == response.data.jobId){
            this.job.isApplied = '1'
          }
        },
        error: (err) => {
          console.log(err);
          
          this.utilityService.showError('Job Application Error', err.error.message);
        }
      }
    )
  }
}
