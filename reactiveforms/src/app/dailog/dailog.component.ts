import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Inject } from '@angular/core';
import { BasckendService } from '../basckend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css'],
})
export class DailogComponent implements OnInit {
  employees = ['DotNet', 'PHP', 'IT', 'C#'];

  employeeForm!: FormGroup;
  actionBtn:string = "Save"

  constructor(
    private notify:NotificationService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DailogComponent>,
    private employeeService: BasckendService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      id:[0,Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      salary: [0, Validators.required],
      department: ['', Validators.required],
    });
   // console.log(this.editData)
   if(this.editData){
    this.actionBtn = "Update"
    this.employeeForm.controls['id'].setValue(this.editData.id); 
    this.employeeForm.controls['name'].setValue(this.editData.name);
    this.employeeForm.controls['email'].setValue(this.editData.email);
    this.employeeForm.controls['phone'].setValue(this.editData.phone);
    this.employeeForm.controls['salary'].setValue(this.editData.salary);
    this.employeeForm.controls['department'].setValue(this.editData.department);
   }
  }

  AddEmployee(){
    //console.log(this.employeeForm.value)
   if(!this.editData){
    if(this.employeeForm.valid){
      this.employeeService.AddEmployees(this.employeeForm.value).subscribe({
        next:(result)=>{
          this.notify.showSuccess(result.data,"Adding Record")
          this.employeeForm.reset();
          this.dialogRef.close('save');
        },
        error:(err)=>{
          this.notify.showError(err.data,"Check Backend")        }
      })
    }
   }else{
    this.UpdateData();
   }
  }
  UpdateData(){
    this.employeeService.updateEmployees(this.employeeForm.value,this.editData.id).subscribe({
      next:(result)=>{
        this.notify.showSuccess(result.data,"Update the Record")
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        this.notify.showError(err.data,"Check Backend")
      }
    })
  }
}
