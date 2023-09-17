import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  formGroup:FormGroup;

  constructor(private apiService: ApicallService){
    this.formGroup = new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }
  

  login(){
    if(this.formGroup.valid){
      this.apiService.login(this.formGroup.value).subscribe((result)=>{
        console.log(result)
      })
    }
  }

}
