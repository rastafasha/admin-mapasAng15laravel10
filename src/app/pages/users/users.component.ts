import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = "Usuarios"

  loading = false;
  usersCount = 0;
  usuarios: any;
  user: any;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query:string ='';

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.config();
    this.closeMenu();
    this.getUsers();
  }




  getUsers(): void {
    this.userService.getAll().subscribe(
      (res:any) =>{
        this.usuarios = res.users.data;
        error => this.error = error;
        // console.log(this.usuarios);
      }
    );
  }

  config(): void {

    this.userService.config().subscribe(
      (res:any) =>{
        this.roles = res.roles;
      }
    );
  }

  // cambiarRole(selectedValue, id:any) {debugger
  //   const userToUpdate = { ...this.user, role: selectedValue };
  //   this.userService.update(userToUpdate).subscribe(
  //     (resp:any) => {
  //       console.log(resp);
  //       Swal.fire('Actualizado', `actualizado correctamente`, 'success');
  //       this.getUsers();
  //     },
  //     (error) => {
  //       console.error(error);
  //       Swal.fire('Error', `Error al actualizar`, 'error');
  //     }
  //   );
  // }

  cambiarRole(data:any){debugger
    let VALUE = {
      id: data.id,
      roles:data.roles.name
    };
    // console.log(VALUE);
    
    // this.userService.update(data).subscribe(
    //   resp =>{
    //     // console.log(resp);
    //     Swal.fire('Updated', `Client Status Updated successfully!`, 'success');
    //   }
    // )
  }




  eliminarUser(user:User){
    this.userService.deleteById(user).subscribe(
      response =>{
        this.getUsers();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  search() {
    return this.userService.search(this.query).subscribe(
      (res:any)=>{
        console.log(res);
        this.usuarios = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    this.getUsers();
    this.query = '';
  }



}
