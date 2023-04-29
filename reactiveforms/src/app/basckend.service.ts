import { Injectable } from '@angular/core';
import { env } from './env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasckendService {

  Url:string = env.Url;

  constructor(private http:HttpClient) { }
  
  getAllEmployees():Observable<any>{
    return this.http.get<any>("https://localhost:7090/api/Employee");
  }

  AddEmployees(addEmployeeRequest:any):Observable<any>{
    //addEmployeeRequest.id = 0;
    return this.http.post<any>("https://localhost:7090/api/Employee",addEmployeeRequest);
  }

  getEmployees(id:any):Observable<any>{
    return this.http.get<any>("https://localhost:7090/api/Employee/"+ id);
  }

  updateEmployees(data:any,id:number){
    return this.http.put<any>("https://localhost:7090/api/Employee/"+id,data);
  }

  deleteEmployees(id:number){
    return this.http.delete<any>("https://localhost:7090/api/Employee/"+id);
  }
}
