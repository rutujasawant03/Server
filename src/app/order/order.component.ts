import { Component, OnInit, ViewChild } from '@angular/core';
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
  public product :any =[];
  userID:any | undefined;
  displayedColumns: string[] = ['id','category','productName','description','Squantity','price','discount','total','userID','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private api : ApiService) { }

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
  getAllProduct(){
    this.api.getOrders().subscribe((res)=>{
        // console.log(userID,'bhsbxhjsvjxsvxhvsXHVHJXVJV')
        console.log(res,'ggjjvjh')
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error=>{
        alert("Error while fetching the records")
      })
      
    
  }
  deleteOrder(id:number){
    this.api.deleteOrder(id)
    .subscribe({
      next:(res)=>{
        alert("order deleted sucessfully")
        this.getAllProduct();
      },
      error:()=>{
        alert("error while deleting product!")
      }
    })
    this.getAllProduct()
  }
}
