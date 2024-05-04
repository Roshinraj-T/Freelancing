import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  get(apiEndpoint : string){
    return this.http.get(environment.apiUrl + apiEndpoint,{})
  }
}
