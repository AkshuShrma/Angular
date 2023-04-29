import { Employee } from './../../models/employee.model';
import { EmployeesService } from './../../services/employees.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: '',
  };

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployees(id).subscribe({
            next: (res) => {
              this.employeeDetails = res;
            },
          });
        }
      },
    });
  }
  updateEmployee(){
    this.employeeService.updateEmployees(this.employeeDetails.id,this.employeeDetails).subscribe({
      next:(result)=>{
        this.router.navigate(['employees']);
      }
    })
  }

  deleteEmployee(id:any){
    this.employeeService.deleteEmployee(id).subscribe({
      next:(result)=>{
        this.router.navigate(['/employees']);
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
}
