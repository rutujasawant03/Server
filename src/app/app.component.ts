import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormComponent } from './form/form.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CustomerComponent } from './add-product/customer/customer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'server';
  productForm !: FormGroup;
  actionBtn : string ="Save"
  dialogRef: any;
  editData: any;
  
  // displayedColumns: string[] = [ 'category','productName','image','description', 'quantity', ' price','action'];
  // dataSource !: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator !: MatPaginator;
  // @ViewChild(MatSort) sort !: MatSort;
  constructor(private formBuilder:FormBuilder,private api : ApiService,private dialog : MatDialog,private router :Router){

  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category: ['',Validators.required],
      productName : ['',Validators.required],
      description : ['',Validators.required],
      quantity : ['',Validators.required],
      price : ['',Validators.required],
      image : ['']
      
    });
  }
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width:'30%'
      
    })
   
}
loggedin(){
  return localStorage.getItem('role');

}
logout() {
  
  
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('localCart');
  this.router.navigate(['login'])
  
  
}


// getAllProduct(){
//   this.api.getProduct()
//   .subscribe({
//     next:(res)=>{
//       // this.dataSource = new MatTableDataSource(res);
//       // this.dataSource.paginator = this.paginator;
//       // this.dataSource.sort = this.sort;
//     },
//     error:(err)=>{
//       alert("Error while fetching the records")
//     }
//   })
// }
// getAllUser(){
//   this.api.getUser()
//   .subscribe({
//     next:(res)=>{
//       this.dataSource = new MatTableDataSource(res);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     },
//     error:(err)=>{
//       alert("Error while fetching the records")
//     }
//   })
// }
// editProduct(row  : any){
//   this.dialog.open(FormComponent,{
//     width:'30%',
//     data:row
//   }).afterClosed().subscribe(val=>{
//     if(val ==='update'){
//       this.getAllProduct();
//     }
//   })
// }
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
// deleteProduct(id:number){
//   this.api.deleteProduct(id)
//   .subscribe({
//     next:(res)=>{
//       alert("Product deleted sucessfully")
//       this.getAllProduct();
//     },
//     error:()=>{
//       alert("error while deleting product!")
//     }
//   })
// }
// deleteUser(id:number){
//   this.api.deleteUser(id)
//   .subscribe({
//     next:(res)=>{
//       alert("User deleted sucessfully")
//       this.getAllUser();
//     },
//     error:()=>{
//       alert("error while deleting User!")
//     }
//   })
// }
// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }
addProduct(){
  if(!this.editData){
   if(this.productForm.valid){
     this.api.postProduct(this.productForm.value)
     .subscribe({
       next:(res)=>{
         alert("Product added sucessfully")
         this.productForm.reset();
         this.dialogRef.close('save');
       },
       error:()=>{
         alert("error while adding product")
       }
     })
   }
  }
 
 }

}
