import { Component,  OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {PaisService} from'../../services/pais.service';
import { Pais } from '../../models/pais';


declare var $:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{

  paises:Pais;
  isActive:boolean;
  error: {};

  ServerUrl = environment.url_media;
  private http: HttpClient;



  constructor(
    private paisService: PaisService,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }


  ngOnInit() {

    this.paisService.getPaises().subscribe(
      (data: Pais) => this.paises = data,
      error => this.error = error
    );

    console.log(this.paises);


  }



  botonActivo(event:string) {

    console.log(this.paises.code, this.paises.id);

}

}
