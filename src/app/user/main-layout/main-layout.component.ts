import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMaster } from 'src/app/core/interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  userId : string | null = '';
  userName : string | null = '';
  clientTabs: IMaster[] = [
    {
      id: 1,
      name: 'Post a job',
      route : 'client'
    },
    {
      id: 2,
      name: 'My Jobs',
      route : 'client/my-jobs'
    },
    {
      id: 3,
      name: 'My fav workers',
      route : ''
    }];
  freelancerTabs : IMaster[] = 
  [
    {
      id: 1,
      name: 'Find a job'
    },
    {
      id: 2,
      name: 'My works'
    }];
  tabs : IMaster[] = [];
  selectedTab : number = 0;
  constructor (
    private router : Router
  ){

  }
  ngOnInit(): void {
    if(localStorage.getItem('roleId') && (localStorage.getItem('roleId') == '1')){
      this.tabs = this.clientTabs;
      this.router.navigate(['user/client'])
    } else{
      this.tabs = this.freelancerTabs;
    }
    if(localStorage.getItem('userName')){
      this.userName = localStorage.getItem('userName')
    }
    this.getUserDetails();
  }
  getUserDetails(){
    // this.
  }
  redirectToProfile(){

  }

}
