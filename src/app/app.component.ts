import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './service/api-service.service';
import { API_LIST } from './core/apiList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GITHUB';
  constructor (
    private apiService :ApiServiceService
  ){}
  ngOnInit(): void {
    this.apiService.getMaster(API_LIST.getDurationOption).subscribe(d=>console.log(d))

  }

}
