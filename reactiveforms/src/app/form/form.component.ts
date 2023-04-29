import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  integerRegex = /^\d+$/
  emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
  registerForm = new FormGroup({
     fname: new FormControl("",[Validators.required,Validators.maxLength(32)]),
     lname: new FormControl("",[Validators.required,Validators.maxLength(32)]),
     email: new FormControl("",[Validators.required,Validators.maxLength(32),Validators.pattern(this.emailRegex)]),
     age: new FormControl("",[Validators.required,Validators.max(62),Validators.min(18),Validators.pattern(this.integerRegex)]),
     mobile: new FormControl("",[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(this.integerRegex)]),
     password: new FormControl("",[Validators.required,Validators.maxLength(32),Validators.minLength(8)]),
     cpassword: new FormControl("",[Validators.required,Validators.maxLength(32),Validators.minLength(8)])
   });
   constructor(){}
 
   ngOnInit(): void {
     // this.registerForm(){
   }
   getControl(name:any):AbstractControl | null{
    return this.registerForm.get(name); 
   }
   Register(){
     console.log(this.registerForm.value)
   }
 }
