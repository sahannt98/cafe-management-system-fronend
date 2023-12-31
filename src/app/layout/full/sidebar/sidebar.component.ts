import { Component, ViewChild } from '@angular/core';
import { MenuItems } from 'src/app/shared/menu-items';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  userRole:any;
  token:any = localStorage.getItem('token');
  tokenPayload:any;
  
  @ViewChild('drawer') drawer:any;

  constructor(
    //  public menuItems: MenuItems
    private router:Router
  ) {
    this.tokenPayload = jwt_decode(this.token);
    this.userRole = this.tokenPayload.role;
   }

  toggleNavbar(){
    this.drawer.toggle();
  }

  }
