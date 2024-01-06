import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../user-api.service';
import { UserModel } from '../models/users.models';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  p: number = 1;

  searchUser : any = ""  

  adminLoginTime : any = new Date();

  allUsers : UserModel[] = []  // to hold user details from the api fetch request

  constructor(private api:UserAPIService){}

  ngOnInit(): void {
    this.getAllUsers()
  }

  // get a list of users from the server
  getAllUsers(){
    this.api.getAllUsers().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers = res
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // delete a user from the server
  deleteUser(id:any){
      this.api.deleteUserApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('user deleted successfully')
        this.getAllUsers()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // sort users by Id
  sortUsersById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  // sort users by name
  sortUsersByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  // generate pdf 
  generatePDF(){
    let pdf = new jsPDF()
    let head = [['id','name','email','password']]
    let body : any=[]

    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.password])
    })
    pdf.text('AllUsersList',10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('allUsersList.pdf')
  }

}
