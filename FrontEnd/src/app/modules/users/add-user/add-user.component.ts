import { Component } from '@angular/core';
import { UserModel } from '../models/users.models';
import { UserAPIService } from '../user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user : UserModel={} // To hold user data from the user
  constructor(private api: UserAPIService,private router:Router){}

  addUser() {
    console.log(this.user); // object to hold user data
    this.api.addUserApi(this.user).subscribe({
      next : (res : UserModel) => {
        console.log(res)
        alert('New user added successfully')
        this.router.navigateByUrl('users')
      },
      error : (err : any) => {
        alert(err.message)
      }
    })
  }

}
