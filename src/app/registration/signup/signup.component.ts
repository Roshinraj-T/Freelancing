import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API_LIST } from 'src/app/core/apiList';
import { ApiResponse, IMaster } from 'src/app/core/interface';
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
    this.apiService.getMaster(API_LIST.getProfessionData).subscribe((response)=>{
      this.professions = response
    })
  }
  getExperienceLevelData(){
    this.apiService.getMaster(API_LIST.getExperienceLevelData).subscribe((response)=>{
      this.experiences = response
    })
  }
  getLocationData(){
    this.apiService.getMaster(API_LIST.getLocationData).subscribe((response)=>{
      this.locations = response
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
  signUpSubmission(){
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      return;
    }
     else{
      this.apiService.signUp(API_LIST.signUp,this.signUpForm.value).subscribe((response:ApiResponse)=>{
        if (response.data) {
          this.utilityService.showSuccess('Signup Successful', response.message);
          this.signUpForm.reset();
          localStorage.setItem('userId',response.data.id)
          localStorage.setItem('userName',response.data.name)
          localStorage.setItem('roleId',response.data.roleId)
          this.router.navigate(['user'])
        }
      },
      (error) => {
        this.utilityService.showError('Signup Error', error.error.message);
      })
    }
  }
}
