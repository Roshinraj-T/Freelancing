import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API_LIST } from 'src/app/core/apiList';
import {  IMaster } from 'src/app/core/interface';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UtilServiceService } from 'src/app/utils/util-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers : [MessageService]
})
export class SignupComponent  implements OnInit{
  selectedRole : string = '';
  selected : boolean = false;
  roleVisible : boolean = true;
  signUpForm !: FormGroup;
  signUpFormVisible : boolean  = false;
  professions : IMaster[] = [];
  locations : IMaster[] = [];
  experiences : IMaster[] = [];

  constructor (
    private formBuilder : FormBuilder,
    private utilityService : UtilServiceService,
    private apiService : ApiServiceService,
    private router : Router
  ) {
  }
  ngOnInit(): void {
    this.getMaters();
  }
  getMaters(){
    this.getProfessionData();
    this.getExperienceLevelData();
    this.getLocationData();
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
  selectRole(role:string){
    this.selectedRole = role;
  }
  createFormAction(){
    this.roleVisible = false;
    this.signUpFormVisible = true;
    if (this.selectedRole === 'Freelancer') {
      this.signUpForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        locationId: [null, Validators.required],
        professionId: [null, Validators.required],
        experienceLevelId: [null, Validators.required],
        roleId : [2]
      });
    } else {
      this.signUpForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        locationId: [null, Validators.required],
        roleId : [1]
      });
    }
  }
  signUpSubmission() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    else {
      this.apiService.post(API_LIST.signUp, this.signUpForm.value).subscribe(
        {
          next: (response) => {
            this.utilityService.showSuccess('Signup Successful', response.message);
            this.signUpForm.reset();
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('userName', response.data.name)
            localStorage.setItem('roleId', response.data.roleId)
            if(localStorage.getItem('roleId') && (localStorage.getItem('roleId') == '1')){
              this.router.navigate(['user/client'])
            } else{
              this.router.navigate(['user/freelancer'])
            }
          },
          error: (err) => {
            console.log(err);
            
            this.utilityService.showError('Signup Error', err.error.message);
          }
        })
    }
  }
}
