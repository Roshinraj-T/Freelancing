import { Component, OnInit } from '@angular/core';
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
      route : ''
    },
    {
      id: 1,
      name: 'My works',
      route : ''
    },
    {
      id: 1,
      name: 'My fav workers',
      route : ''
    }];
  freelancerTabs : IMaster[] = 
  [
    {
      id: 1,
      name: 'Post a job'
    },
    {
      id: 1,
      name: 'My works'
    }];
  tabs : IMaster[] = [];
  selectedTab : number = 0;
  constructor (
  ){

  }
  ngOnInit(): void {
    if(localStorage.getItem('roleId') && (localStorage.getItem('roleId') == '1')){
      this.tabs = this.clientTabs;
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
