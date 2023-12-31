import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{

oldPassword = true;
//  newPassword = true;
//  confirmPassword = true;
changePasswordForm:any = FormGroup;
newPassword = true;
confirmPassword = true;
responseMessage:any;

 constructor(
  private formBuilder:FormBuilder,
  private userSeervice:UserService,
  public dialogRef: MatDialogRef<ChangePasswordComponent>,
  private ngxService:NgxUiLoaderService,
  private snackbarService:SnackbarService
 ) { }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      oldPassword:[null, [Validators.required]],
      newPassword:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]]
    })
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }


  handleChangePassword(){
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    console.log(formData);
    var data = {
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }
    this.userSeervice.changePassword(data).subscribe({
      next: (response:any)=>{
        this.ngxService.stop();
        this.responseMessage = response.message;
        this.dialogRef.close();
        this.snackbarService.openSnackBar(this.responseMessage, "success")
      },
      error: (error:any)=>{
        this.ngxService.stop();
        if(error.error.message){
          this.responseMessage = error.error.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericErrorMessage;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }
}
