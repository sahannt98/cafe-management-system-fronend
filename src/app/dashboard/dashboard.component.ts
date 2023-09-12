import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  resposeMessage:any;
  data:any;

  constructor(
    private dashboardService:DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService:SnackbarService
    ) {
      this.ngxService.start();
      this.dashboardData();
     }

    dashboardData(){
      this.dashboardService.getDetails().subscribe({
        next: (response:any) => {
          this.ngxService.stop();
          this.data = response;
        },
        error: (error:any) => {
          this.ngxService.stop();
          console.log(error);
          if(error.error.message){
            this.resposeMessage = error.error.message;
          }
          else{
            this.resposeMessage = GlobalConstants.genericErrorMessage;
          }
           this.snackbarService.openSnackBar(this.resposeMessage, GlobalConstants.error);
        }
      })
    }

}
