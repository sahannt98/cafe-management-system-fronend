import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit{

  displayedColumns: string[] = ['name', 'edit'];
  dataSource:any;
  responseMessage: any;

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
    }

    handleAddAction(){
      
    }

}
