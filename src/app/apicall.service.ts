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
    //console.log("service",data)
    return this.http.post(`${baseUrl}accounts/login/`,data)
  }

  getUserDetails():Observable<any>{
    let headers = new HttpHeaders()
    .set('BEARER',`${localStorage.getItem('token')}`)
    .set('USER-ID',`${localStorage.getItem('userId')}`);
    return this.http.get(`${baseUrl}accounts/user/85NPW/`,{headers})
  }

  getGraphandStageCounts(stage_type:String):Observable<any>{
    let headers = new HttpHeaders()
    .set('BEARER',`${localStorage.getItem('token')}`)
    .set('USER-ID',`${localStorage.getItem('userId')}`);
    return this.http.get(`${baseUrl}leads/dashboard/graph/?stage_type=${stage_type}`,{headers})
  }

  getProbability(stage_type:String):Observable<any>{
    let headers = new HttpHeaders()
    .set('BEARER',`${localStorage.getItem('token')}`)
    .set('USER-ID',`${localStorage.getItem('userId')}`);
    return this.http.get(`${baseUrl}leads/probability/analysis/?stage_type=${stage_type}`,{headers})
  }

  getActiveLeadStatus():Observable<any>{
    let headers = new HttpHeaders()
    .set('BEARER',`${localStorage.getItem('token')}`)
    .set('USER-ID',`${localStorage.getItem('userId')}`);
    return this.http.get(`${baseUrl}leads/stage/`,{headers})
  }

  getLeadsList(stage_type:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('BEARER',`${localStorage.getItem('token')}`)
    .set('USER-ID',`${localStorage.getItem('userId')}`);
    return this.http.get(`${baseUrl}leads/?stage_type=${stage_type}&limit=10&offset=0&search=&ordering=-probability`,{headers})
  }
}
