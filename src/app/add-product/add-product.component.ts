import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { disableDebugTools } from '@angular/platform-browser';
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
  totalQuntyty:any;
  selectedValue!: string;
  Squantity:any;
  submitted ! : true ;
  item:any;
  b:any;
  a:any;
  resultqut:any;
 

  constructor(private formBuilder:FormBuilder,private api : ApiService,private dialog : MatDialog ,
    @Inject(MAT_DIALOG_DATA)public editData : any, private dialogRef : MatDialogRef<FormComponent>) { }

  ngOnInit(): void {
   
        
     
    
    this.productForm = this.formBuilder.group({
      
      id:'',
      category: ['',[Validators.required]],
      productName : ['',[Validators.required]],
      description :['',[Validators.required]],
      quantity : ['',[Validators.required]],
      price : ['',[Validators.required]],
      image :'',
      discount:10,
      SQty:'',
      RemQty:'',
      
    });
  
    if(this.editData){
        this.actionBtn = "Update";
       
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['description'].setValue(this.editData.description);
        this.productForm.controls['quantity'].setValue(this.editData.quantity);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['image'].setValue(this.editData.image);
        this.productForm.controls['RemQty'].setValue(this.editData.RemQty);
        this.productForm.controls['SQty'].setValue(this.editData.SQty);
        
        
    
      }
      
     // 
  }
  // addOrder(){
  //   this.api.putOrder(this.editData.id,this.editData.Squantity)
    
  // }
  addProduct(){
   
   if(!this.editData){
    if(this.productForm.valid){
      this.submitted = true
     console.log(this.productForm.value,"hgfdsfghjkhgfdsfghjjhgfdsfghjgfdsfghj")
     
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
    if(this.productForm.invalid){
      alert("All fields are required")
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


