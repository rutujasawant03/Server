import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public product: any = [];
  productForm !: FormGroup;
  userID: any | undefined;
  PID: any;
  a: any;
  b: any;
  c: any;
  data: any;
  pid: any;
  pcat: any;
  pname: any;
  pdis: any;
  ppris: any;
  pimg: any;
  qut: any;
  displayedColumns: string[] = ['id', 'category', 'productName', 'description', 'quantity', 'price', 'discount', 'total', 'userID', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private api: ApiService, private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getAllProduct();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllProduct() {
    this.api.getOrders().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRef.detectChanges();
    }, error => {
      alert("Error while fetching the records")
    })
  }
  // updateQty() {
  //   debugger
  //   this.api.getOrders().subscribe((result) => {
  //     for (let i = 0; i < result.length; i++) {
  //       this.PID = result[i].productid;
  //       this.b = result[i].quantity;
  //       this.api.getProduct().subscribe((res) => {
  //         for (let i = 0; i < res.length; i++) {
  //           if (res[i].id === this.PID) {
  //             this.pid = res[i].id;
  //             this.pcat = res[i].category;
  //             this.pname = res[i].productName;
  //             this.pdis = res[i].description;
  //             this.ppris = res[i].price;
  //             this.pimg = res[i].image;
  //             this.qut = res[i].quantity;
  //             this.a = res[i].SQty;
  //           }
  //         }
  //         let resultqut = parseInt(this.a) - parseInt(this.b);
  //         this.productForm = this.formBuilder.group({
  //           id: '',
  //           category: ['', [Validators.required]],
  //           productName: ['', [Validators.required]],
  //           description: ['', [Validators.required]],
  //           quantity: ['', [Validators.required]],
  //           price: ['', [Validators.required]],
  //           SQty: ['', [Validators.required]],
  //           RemQty: ['', [Validators.required]],
  //           image: '',
  //           discount: 10,
  //         });
  //         this.productForm.controls['id'].setValue(this.pid)
  //         this.productForm.controls['category'].setValue(this.pcat)
  //         this.productForm.controls['productName'].setValue(this.pname)
  //         this.productForm.controls['description'].setValue(this.pdis)
  //         this.productForm.controls['price'].setValue(this.ppris)
  //         this.productForm.controls['image'].setValue(this.pimg)
  //         this.productForm.controls['quantity'].setValue(this.qut)
  //         this.productForm.controls['SQty'].setValue(resultqut)
  //         this.productForm.controls['RemQty'].setValue(this.b)
  //         this.api.putProductqty(result[i].productid, this.productForm.value).subscribe((res1) => {
  //           alert("Stock updated")
  //         })
  //       })
  //     }
  //   })

  // }
  deleteOrder(id: number) {
    this.api.deleteOrder(id)
      .subscribe({
        next: (res) => {
          alert("order deleted sucessfully")
          this.getAllProduct();
        },
        error: () => {
          alert("error while deleting product!")
        }
      })
    this.getAllProduct()
  }
}
