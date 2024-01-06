import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  server_url = 'https://angular-ems-backend.onrender.com'
  constructor(private http:HttpClient) { }

  // Add a user API - post - data send to the server 
  addUserApi(user:UserModel){
    return this.http.post(`${this.server_url}/users`,user)
  }

  // Get all user API - post 
  getAllUsers(){
    return this.http.get(`${this.server_url}/users`)
  }

  // Delete a user API - delete
  deleteUserApi(id:any){
    return this.http.delete(`${this.server_url}/users/${id}`)
  }

  // View a user API
  viewUserApi(id:any){
    return this.http.get(`${this.server_url}/users/${id}`)
  } 

  // update user details 
  updateUserApi(id:any,user:UserModel){
    return this.http.put(`${this.server_url}/users/${id}`,user)
  } 
}


