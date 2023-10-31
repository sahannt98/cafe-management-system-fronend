import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit{

  dataSource: any;
  responseMessage: any;
  filteredData: any;

  constructor(private billService:BillService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router: Router
    ){
    }

  ngOnInit():void{
    this.ngxService.start();
    this.tableData();
  }
  
  tableData(){
    this.billService.getBills().subscribe({
      next: (response:any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        this.filteredData = this.dataSource.filteredData;
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

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.filteredData;
  }

  handleViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ViewBillComponent, dialogConfig);
    this.router.events.subscribe(() =>{
      dialogRef.close();
    })
  }

  handleDeleteAction(value:any){

  }

  downloadReportAction(value:any){

  }
}
