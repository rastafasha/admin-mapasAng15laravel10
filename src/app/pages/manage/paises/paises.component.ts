import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {Pais} from '../../../models/pais';
import { PaisService } from '../../../services/pais.service';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  title = 'Administrar Paises';
  loading = false;
  paises: Pais;
  error: string;
  pais: string;

  ServerUrl = environment.url_servicios;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  query:string ='';

  constructor(
    public paisService: PaisService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    
    window.scrollTo(0, 0);
    this.getPaises();

    //console.log(this.paises);
  }

  getPaises(){
    this.paisService.getPaises().subscribe((resp:any)=>{
      console.log(resp);
      this.paises = resp.countries;
    })
  }

  onDelete(code: string) {
    if (confirm('Are you sure want to delete code = ' + code)) {
      this.paisService.deletePais(+code).subscribe(
        (res:any) => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  search() {
    return this.paisService.search(this.query).subscribe(
      (resp:any)=>{
        this.paises = resp;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    this.getPaises();
    this.query = '';
  }

}
