import { FormGroup,FormBuilder } from '@angular/forms';
import { BasckendService } from './../basckend.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employee } from '../models/employee';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
 // employees:FormGroup[]=[];
 displayedColumns: string[] = ['name', 'email', 'phone','salary','department','action'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(
  private notify:NotificationService,
  public dialog: MatDialog,
  private api:BasckendService) {}

 ngOnInit(): void {
   this.getAll();
 }

 
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

 getAll(){
  this.api.getAllEmployees().subscribe({
    next:(result)=>{
     // console.log(result)
     this.dataSource = new MatTableDataSource (result);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort =this.sort;
    },
    error:(res)=>{
      alert("somthing is wrong");
    }
  })
 }

 editEmployee(row:any){
   this.dialog.open(DailogComponent,{
    width:'30%',
    data:row
   }).afterClosed().subscribe(val=>{
     if(val==='update'){
      this.getAll();
     }
   })
 }

 deleteEmployee(id:any){
    this.api.deleteEmployees(id).subscribe({
      next:(res)=>{
        this.notify.showSuccess(res.data,"Deleting the record");
        this.getAll();
      },
      error:(err)=>{
        this.notify.showError(err.data,"Check Backend")      }
    })
 }
 
  openDialog(){
     this.dialog.open(DailogComponent, {
      width:'30%',
      //height:'30%'
     }).afterClosed().subscribe(val=>{
      if(val==='save'){
       this.getAll();
      }
    })
  }

  openDial(){
    this.dialog.open(FormComponent, {
     width:'30%',
     //height:'30%'
    })
 }
}


