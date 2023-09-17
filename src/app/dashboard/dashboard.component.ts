import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userImage:String ='';
  userName: String  = '';
  constructor(private apiService: ApicallService){

  }

  ngOnInit(){
    this.apiService.getUserDetails().subscribe((result)=>{
      console.log(result)
      this.userImage = result.data.image;
      this.userName = result.data.first_name+ ' ' + result.data.last_name
    })
  }

}
