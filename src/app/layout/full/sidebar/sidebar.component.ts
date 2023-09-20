import { Component } from '@angular/core';
import { MenuItems } from 'src/app/shared/menu-items';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  userRole:any;
  token:any = localStorage.getItem('token');
  tokenPayload:any;
  
  constructor(
    public menuItems: MenuItems
  ) {
    this.tokenPayload = jwt_decode(this.token);
    this.userRole = this.tokenPayload.role;
   }
}
