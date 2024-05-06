import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { API_LIST } from 'src/app/core/apiList';
import {  IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';
import { Socket, io } from "socket.io-client";
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit{
  postJobVisible : boolean = false;
  postJobForm !: FormGroup;
  professions : IMaster[] = [];
  locations : IMaster[] = [];
  experiences : IMaster[] = [];
  durationOptions : IMaster[] = [];
  jobTypes : IMaster[] = [];
  socket !:Socket;
  constructor (
    private formBuilder : FormBuilder,
    private apiService : ApiServiceService,
    private utilityService : UtilServiceService
  ){
    this.postJobForm = this.formBuilder.group({
      professionId: [null, Validators.required],
      description : ['',Validators.required],
      durationOptionId : [null,Validators.required],
      clientId : [localStorage.getItem('userId')],
      experienceLevelId: [null, Validators.required],
      jobStatusId: [1],
      address : ['',Validators.required],
      locationId: [null, Validators.required],
    })
  }
  ngOnInit(): void {
    this.getMaters();
    this.socketConnection();
  }
  getMaters(){
    this.getProfessionData();
    this.getExperienceLevelData();
    this.getLocationData();
    this.getDurationOption();
    this.getJobType();
  }
  getProfessionData(){
    this.apiService.getMaster(API_LIST.getProfessionData).subscribe(
      {
        next:(response)=>{
          this.professions = response
        },
        error : (err:Error)=>{
          this.utilityService.showError('Request Failed', err.message);
        }
      })
  }
  getExperienceLevelData(){
    this.apiService.getMaster(API_LIST.getExperienceLevelData).subscribe(
      {
        next:(response)=>{
          this.experiences = response
        },
        error : (err:Error)=>{
          this.utilityService.showError('Request Failed', err.message);
        }
      })
  }
  getLocationData(){
    this.apiService.getMaster(API_LIST.getLocationData).subscribe(
      {
        next:(response)=>{
          this.locations = response
        },
        error : (err:Error)=>{
          this.utilityService.showError('Request Failed', err.message);
        }
      })
  }
  getDurationOption(){
    this.apiService.getMaster(API_LIST.getDurationOption).subscribe(
      {
        next:(response)=>{
          this.durationOptions = response
        },
        error : (err:Error)=>{
          this.utilityService.showError('Request Failed', err.message);
        }
      })
  }
  getJobType(){
    this.apiService.getMaster(API_LIST.getJobType).subscribe((response)=>{
      this.jobTypes = response
    },(error) => {
      this.utilityService.showError('Request Failed', error.error.message);
    })
  }
  lengthChecker(length :number){
    console.log(this.postJobForm.value.description.length,length);

    if(this.postJobForm.value.description.length > length){
      console.log(this.postJobForm.value.description.length,length);
      
      return false;
    } else{
      return true
    }
  }
  postAJobAction() {
    if (this.postJobForm.invalid) {
      this.postJobForm.markAllAsTouched();
      return;
    } else {
      this.apiService.post(API_LIST.postAJob, this.postJobForm.value).subscribe(
        {
          next: (response) => {
            this.postJobForm.reset();
            this.postJobVisible = false;
            this.utilityService.showSuccess('Request Success', response.message)
          },
          error: (err: Error) => {
            this.utilityService.showError('Request Failed', err.message);
          }
        }
      )
    }
  }
  checkJobDuration(event :number){
    if(event == 3){
      this.postJobForm.addControl('jobTypeId',new FormControl(null, Validators.required))
    }else if (event != 3){
      this.postJobForm.removeControl('jobTypeId')
    }
  }
  socketConnection() {
    const socket = io(environment.socketUrl);
    this.socket = socket;
    socket.emit('notification', {})
    socket?.on("notification_result", (data: { isJobComplete: boolean }) => {

    })
    }
}
