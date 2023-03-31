import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { ApiService } from '../services/api.service';
interface Category {
  value: string;
  viewValue: string;
 
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  productForm !: FormGroup;
  actionBtn : string ="Save"
  public product :any =[];
  selectedValue!: string;
  Squantity:any;
  submitted ! : true ;
  item:any;
  category: Category[] = [
    {value: 'Rice', viewValue: 'Rice'},
    {value: 'Dal', viewValue: 'Dal'},
    {value: 'Fruit', viewValue: 'Fruit'},
    {value: 'Snacks', viewValue: 'Snacks'},
    {value: 'Foodgrains', viewValue: 'Foodgrains'},
    {value: 'Beverages', viewValue: 'Beverages'},
    {value: 'Snacks', viewValue: 'Snacks'},
    {value: 'Flour', viewValue: 'Flour'},
  ];
  
 

  constructor(private formBuilder:FormBuilder,private api : ApiService,private dialog : MatDialog ,
    @Inject(MAT_DIALOG_DATA)public editData : any, private dialogRef : MatDialogRef<FormComponent>) { }

  ngOnInit(): void {
   
    this.productForm = this.formBuilder.group({
      
      id:'',
      category: ['',([Validators.required,Validators.min(8)])],
      productName : ['',([Validators.required,Validators.min(8)])],
      description :['',([Validators.required,Validators.min(8)])],
      quantity : ['',([Validators.required,Validators.min(8)])],
      price : ['',([Validators.required,Validators.min(8)])],
      image :'',
      discount:10,
      Squantity:'',
      Tquantity:'',
      
    });
    if(this.editData){
        this.actionBtn = "Update";
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['description'].setValue(this.editData.description);
        this.productForm.controls['quantity'].setValue(this.editData.quantity);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['image'].setValue(this.editData.image);
        this.productForm.controls['Squantity'].setValue(this.editData.Squantity);
    
      }
      
  }
  // addOrder(){
  //   this.api.putOrder(this.editData.id,this.editData.Squantity)
    
  // }
  addProduct(){
   
   if(!this.editData){
    if(this.productForm){
      this.submitted = true
    
      if(this.productForm.invalid){
        alert("Something went wrong")
      }
      else{
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
   else{
       this.updateProduct()
     }
    
  }
 
  updateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated sucessfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("error while updating record");
        }
      })
    }
   
     CartDetails(){
      this.api.getProduct()
      .subscribe(res=>{
        this.product = res;
        
        
      })
    }
}


