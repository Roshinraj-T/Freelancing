import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_LIST } from 'src/app/core/apiList';
import {  IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';

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
  constructor (
    private formBuilder : FormBuilder,
    private apiService : ApiServiceService,
    private utilityService : UtilServiceService
  ){
    this.postJobForm = this.formBuilder.group({
      professionId: [null, Validators.required],
      description : ['',Validators.required],
      jobTypeId : [null, Validators.required],
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
          this.utilityService.showError('Request Error', err.message);
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
          this.utilityService.showError('Request Error', err.message);
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
          this.utilityService.showError('Request Error', err.message);
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
          this.utilityService.showError('Request Error', err.message);
        }
      })
  }
  getJobType(){
    this.apiService.getMaster(API_LIST.getJobType).subscribe((response)=>{
      this.jobTypes = response
    },(error) => {
      this.utilityService.showError('Request Error', error.error.message);
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
  postAJobAction(){
    console.log("ppppppppppppppppppppppppppp");
    
    if(this.postJobForm.invalid){
      this.postJobForm.markAllAsTouched();
      return ;
    }else{
      this.apiService.postAJob(API_LIST.postAJob,this.postJobForm.value).subscribe(
        {
          next:(response)=>{
            this.postJobForm.reset();
            this.postJobVisible = false;
            this.utilityService.showSuccess('Request Success',response.message)
          },
          error : (err:Error)=>{
            this.utilityService.showError('Request Error', err.message);
          }
        }
)
    }
  }
}
