import { Component } from '@angular/core';
import { AdminAPIService } from '../services/admin-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = ""
  password : string = ""
  adminDetails : any = {}

  constructor(private api:AdminAPIService,private router:Router){}

  login(){
    if (this.email==''||this.password==''){
      alert('Please fill the form')
    }
    else{
      this.api.Authenticate().subscribe(
        {
          next : (res:any) => {
            const {email, password} = res
            if (email==this.email && password==this.password)
            {
              alert('login successful')
              console.log(res);
              this.adminDetails= res
              localStorage.setItem('adminName',this.adminDetails.name)
              localStorage.setItem('adminPassword',this.adminDetails.password)
              this.router.navigateByUrl('dashboard')
            }
            else
            {
              alert('invalid data')
            }
          },
          error : (res:any) => {
            console.log(res);
          }
        }
      )
    }
  }
}
