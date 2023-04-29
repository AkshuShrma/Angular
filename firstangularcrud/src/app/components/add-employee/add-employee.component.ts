import { EmployeesService } from './../../services/employees.service';
import { Employee } from './../../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeRequest:Employee = {
    id:0,
    name:'',
    email:'',
    phone:'',
    salary:0,
    department:''
  }

  constructor(private employeesService:EmployeesService, private router:Router){}

  ngOnInit(): void {
    
  }

  AddEmployee(){
    //console.log(this.addEmployee)
    this.employeesService.AddEmployees(this.addEmployeeRequest).subscribe({
      next:(result)=>{
      this.router.navigate(['employees']);
        //console.log(result);
      },
      error:(resp)=>{
        console.log(resp);
      }
    })
  }

}
