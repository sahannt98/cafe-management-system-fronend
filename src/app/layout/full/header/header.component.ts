import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  role:any
  constructor(private router:Router,
    private dialog:MatDialog
    ) { }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'Logout',
      confirmation:true
    };
    const dialogRef = this.dialog.open(LogoutComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: (response:any)=>{
        dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    })
  }
  
  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px'; 
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
