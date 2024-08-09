import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {Prensa} from '../../../models/prensa';
import { PrensaService } from '../../../services/prensa.service';


@Component({
  selector: 'app-prensa-index',
  templateUrl: './prensa-index.component.html',
  styleUrls: ['./prensa-index.component.css']
})
export class PrensaIndexComponent implements OnInit {

  titlepage = 'Prensa';
  prensas: Prensa;
  error: string;
  prensa: Prensa;

  ServerUrl = environment.url_servicios;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  constructor(
    public prensaService: PrensaService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.getArtPrensas();
    window.scrollTo(0, 0);

  }

  getArtPrensas(){
    this.prensaService.getPrensas().subscribe(
      (data: Prensa) => this.prensas = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.prensaService.deletePrensa(+id).subscribe(
        res => {
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

}
