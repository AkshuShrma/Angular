import { AddEmployeeComponent } from './../components/add-employee/add-employee.component';
import { Employee } from './../models/employee.model';
import { env } from './env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  Url:string = env.Url;

  constructor(private http:HttpClient) { }

  getAllEmployees():Observable<any[]>{
    return this.http.get<any[]>(this.Url + '/api/Employee');
  }

  AddEmployees(addEmployeeRequest:any):Observable<any>{
    //addEmployeeRequest.id = 0;
    return this.http.post<any>(this.Url + '/api/Employee',addEmployeeRequest);
  }

  getEmployees(id:any):Observable<any>{
    return this.http.get<any>(this.Url + '/api/Employee/'+ id);
  }

  updateEmployees(id:any,updateEmp:any):Observable<any>{
    return this.http.put<any>(this.Url + '/api/Employee/'+id,updateEmp);
  }

  deleteEmployee(id:any):Observable<any>{
    return this.http.delete<any>(this.Url + '/api/Employee/'+id);
  }
}
