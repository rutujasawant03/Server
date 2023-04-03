import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}from '@angular/material/dialog'
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from "@angular/core";
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
@Injectable({ 
  providedIn: 'any' 
})
export class FormComponent implements OnInit {
  productForm !: FormGroup;
PID:any;
  // actionBtn : string ="Save"
  public product :any =[];
  displayedColumns: string[] = [ 'category','productName','image','description','quantity','price','SQty','action','Qr'];
  dataSource !: MatTableDataSource<any>;
  total:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private formBuilder:FormBuilder, private api : ApiService,private dialog : MatDialog,) { }
  
  //   @Inject(MAT_DIALOG_DATA)public editData : any, private dialogRef : MatDialogRef<FormComponent>

  ngOnInit(): void {
    // this.productForm = this.formBuilder.group({
    //   category: ['',Validators.required],
    //   productName : ['',Validators.required],
    //   description : ['',Validators.required],
    //   quantity : ['',Validators.required],
    //   price : ['',Validators.required],
    //   image : ['']
      
    // });
    // if(this.editData){
    //   this.actionBtn = "Update";
    //   this.productForm.controls['category'].setValue(this.editData.category);
    //   this.productForm.controls['productName'].setValue(this.editData.productName);
    //   this.productForm.controls['description'].setValue(this.editData.description);
    //   this.productForm.controls['quantity'].setValue(this.editData.quantity);
    //   this.productForm.controls['price'].setValue(this.editData.price);
    //   this.productForm.controls['image'].setValue(this.editData.image);
    // }
    this.getAllProduct();
    this.CartDetails();
   
  }
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width:'30%'
      
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllProduct();
      }
      
    })
   
}
  // addProduct(){
  //  if(!this.editData){
  //   if(this.productForm.valid){
  //     this.api.postProduct(this.productForm.value)
  //     .subscribe({
  //       next:(res)=>{
  //         alert("Product added sucessfully")
  //         this.productForm.reset();
  //         this.dialogRef.close('save');
  //       },
  //       error:()=>{
  //         alert("error while adding product")
  //       }
  //     })
  //   }
  //  }
  //  else{
  //    this.updateProduct()
  //  }
  // }
  // updateProduct(){
  //   this.api.putProduct(this.productForm.value,this.editData.id)
  //   .subscribe({
  //     next:(res)=>{
  //       alert("Product updated sucessfully");
  //       this.productForm.reset();
  //       this.dialogRef.close('update');
  //     },
  //     error:()=>{
  //       alert("error while updating record");
  //     }
  //   })
  // }
  getAllProduct(){
    this.api.getProduct().subscribe((res)=>{
      for(let i=0;i<res.length;i++){
      this.PID=res[i].id;
      let totqyt=res.SQty;
      let Pro=res[i].productName
      let QT=res[i].SQty
      console.log(QT,'MMMMM')
      if(QT===2){
        alert("Refill the Stock of "+Pro)
      }
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    },
    )
    error:(err: any)=>{
      alert("Error while fetching the records")
    }
  
    
  

    
      
       
  }
  editProduct(row  : any){
    this.dialog.open(AddProductComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllProduct();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted sucessfully")
        this.getAllProduct();
      },
      error:()=>{
        alert("error while deleting product!")
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
  CartDetails(){
    this.api.getProduct()
    .subscribe(res=>{
      this.product = res;
      
      
    })
  }
}
