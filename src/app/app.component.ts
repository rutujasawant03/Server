import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  actionBtn: string = "Save"
  dialogRef: any;
  editData: any;

  // displayedColumns: string[] = [ 'category','productName','image','description', 'quantity', ' price','action'];
  // dataSource !: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator !: MatPaginator;
  // @ViewChild(MatSort) sort !: MatSort;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialog: MatDialog, private router: Router) {

  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      image: ['']

    });
  }
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '30%'

    })

  }
  loggedin() {
    return localStorage.getItem('role');
  }
  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('localCart');
    this.router.navigate(['login'])
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("Product added sucessfully")
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("error while adding product")
            }
          })
      }
    }
  }
}
