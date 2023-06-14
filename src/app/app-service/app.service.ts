import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userInterface } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  userURL: string = 'http://localhost:3001/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(){
    return this.httpClient.get(`${this.userURL}`);
  }
  
  createUser(userData: userInterface) {
    return this.httpClient.post(`${this.userURL}`, userData);
  }

  editUser(userId: string, userData:userInterface){
    return this.httpClient.put(`${this.userURL}/${userId}`, userData)
  }

  getSingleUser(id:any){
    return this.httpClient.get(`${this.userURL}/${id}`)
  }

  deleteUser(id:any){
    return this.httpClient.delete(`${this.userURL}/${id}`)
  }

  // getStateData(){
  //   return this.httpClient.get(`${this.userURL}/states`);
  // }

}
