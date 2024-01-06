import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  server_url = 'https://angular-ems-backend.onrender.com'

  constructor(private http:HttpClient) { }

  Authenticate(){
    return this.http.get(`${this.server_url}/users/1`)
  }

  updateAdmin(admin:any){
    return this.http.put(`${this.server_url}/users/1`,admin)
  }
}
