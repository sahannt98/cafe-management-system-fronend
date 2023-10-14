import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { LogoutComponent } from 'src/app/layout/full/logout/logout.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'categoryName',
    'description',
    'price',
    'edit',
  ];
  dataSource: any;
  length1: any;
  responseMessage: any;
  filteredData: any;

  constructor(
    private productService: ProductService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog:MatDialog
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        this.filteredData = this.dataSource.filteredData;
      },

      error: (error: any) => {
        this.ngxService.stop();
        console.log(error.error.message);
        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      },
    });
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.filteredData;
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=> {
      // dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe(()=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data:values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=> {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe(()=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' product',
      confirmation:true
    }
    const dialogRef = this.dialog.open(LogoutComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    }) 
  }

  deleteProduct(id:any){
    this.productService.delete(id).subscribe({
      next: (response:any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "Success")
      },
      error: (error:any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    })
  }

  onChange(checked:boolean, id:number){
    this.ngxService.start();
    var data = {
      status: checked.toString(),
      id:id
    }
    this.productService.updateStatus(data).subscribe({
      next: (response:any) => {
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "Success");
      },
      error: (error:any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    })
  }

}
