import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/users';
import { UserService } from '../services/users.service';


// declare function customInitFunctions(); //llamammos a la funcion que carga los js

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();

  public user: User;
  id:number;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.getUser();
  }




}
