import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  user:any;
  role:any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    //init_plugins();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.role = this.user.roles[0]
  }

  toggleNav(){
    this.sidenav.toggle();
  }

  logout(){
    this.authService.logout();
  }

}
