import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  formGroup:FormGroup;

  constructor(private apiService: ApicallService,private router:Router){
    this.formGroup = new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }
  

  login(){
    if(this.formGroup.valid){
      this.apiService.login(this.formGroup.value).subscribe((result)=>{
        console.log(result)
        if(result.success == true){
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userId",result.data.id);
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }

}
