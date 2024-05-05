import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse, IMaster } from '../core/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getMaster(apiEndpoint : string) : Observable<IMaster[]> {
    return this.http.get<IMaster[]>(environment.apiUrl + apiEndpoint)
  }

  signUp(apiEndpoint : string,data:any) : Observable <ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + apiEndpoint,data)
  }
}
