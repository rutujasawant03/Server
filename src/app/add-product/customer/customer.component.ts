import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormComponent } from '../../form/form.component';
import { ApiService } from '../../services/api.service';

import { passwordMatch } from './validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  signupForm !: FormGroup;
  // submitted ! : true ;
  title = 'angularvalidate';
  // type: string ="password";
  // isText: boolean =false;
  // eyeIcon: string ="fa-eye-slash";
  // actionBtn : string ="Save"
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','fullname','mobile','email','password', 'security','action'];
  
  constructor(
     private api : ApiService,private dialog : MatDialog,private formBuilder:FormBuilder
    ) { }
 


  ngOnInit(): void {
    // this.signupForm = this.formBuilder.group({
    //   fullname:['',[Validators.required,Validators.minLength(6)]],
    //   email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //   password:['',[Validators.required, Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
    //   confirmpassword:['',[Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
    //   mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      
    // }, [passwordMatch("password"," confirmpassword")])
    // if(this.editData){
    //   this.actionBtn = "Update";
    //   this.signupForm.controls['fullname'].setValue(this.editData.category);
    //   this.signupForm.controls['email'].setValue(this.editData.productName);
    //   this.signupForm.controls['password'].setValue(this.editData.description);
    //   this.signupForm.controls['confirmpassword'].setValue(this.editData.quantity);
    //   this.signupForm.controls['mobile'].setValue(this.editData.price);
      
    // }
    this.getAllUser();
   
  
  }
  // OpenDialog(){
  //   this.dialog.open(CustomerComponent, {
  //     width:'30%'
      
  //   }).afterClosed().subscribe(val=>{
  //     if(val ==='save'){
  //       this.getAllUser();
  //     }
      
  //   })
  // }
  // updateUser(){
  //   this.api.putUser(this.signupForm.value,this.editData.id)
  //   .subscribe({
  //     next:(res)=>{
  //       alert("User updated sucessfully");
  //       this.signupForm.reset();
  //       this.dialogRef.close('update');
  //     },
  //     error:()=>{
  //       alert("error while updating record");
  //     }
  //   })
  // }
  getAllUser(){
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })
  }
  // editUser(row  : any){
  //   this.dialog.open(CustomerComponent,{
  //     width:'30%',
  //     data:row
  //   }).afterClosed().subscribe(val=>{
  //     if(val ==='update'){
  //       this.getAllUser();
  //     }
  //   })
  // }
  deleteUser(id:number){
    this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted sucessfully")
        this.getAllUser();
      },
      error:()=>{
        alert("error while deleting User!")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
// function OpenDialog() {
//   throw new Error('Function not implemented.');
// }

