import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatTableModule } from '@angular/material/table';
import { CategoryComponent } from '../dialog/category/category.component';


@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit{

  displayedColumns: string[] = ['name', 'edit'];
  dataSource:any;
  filteredData: any;
  responseMessage: any;
  arr = [1,2,3]

  constructor(
    private categoryService: CategoryService,
    private dialog:MatDialog,
    private ngxService: NgxUiLoaderService,
    private snacbarService: SnackbarService,
    private router: Router
  ) { }

    ngOnInit(): void{
       this.ngxService.start();
       this.tableData();
    }


    tableData(){
      this.categoryService.getCategory().subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.dataSource = new MatTableDataSource(response);
          // this.dataSource = response;
          this.filteredData = this.dataSource.filteredData;
        },
        error: (err: any) => {
          this.ngxService.stop();
          console.log(err.error.message);
          if(err.error.message){
            this.responseMessage = err.error.message;
          }
          else{
            this.responseMessage = GlobalConstants.genericErrorMessage;
          }
          this.snacbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      })
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
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close;
      }); 
      const sub = dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
        this.tableData();
      })
    }

    handleEditAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data:values
      };
      console.log(dialogConfig.data);
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close;
      }); 
      const sub = dialogRef.componentInstance.onEditCategory.subscribe((response)=>{
        this.tableData();
      })
    }

}
