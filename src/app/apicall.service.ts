import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }

  login(data: any):Observable<any>{
    data.device_id = 'fgdg'
    console.log("service",data)
    return this.http.post(`${baseUrl}accounts/login/`,data)
  }
}