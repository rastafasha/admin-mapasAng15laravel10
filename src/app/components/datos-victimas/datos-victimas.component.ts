import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';


import { DatosvictimaService } from '../../services/datos.service';
import { PaisService } from '../../services/pais.service';

import { Datosvictima } from '../../models/datos';
import { Pais } from '../../models/pais';
import { Country } from '../../models/countries';


@Component({
  selector: 'app-datos-victimas',
  templateUrl: './datos-victimas.component.html',
  styleUrls: ['./datos-victimas.component.css']
})
export class DatosVictimasComponent implements OnInit {


  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  datosvictimas: Datosvictima;
  pais: Pais;
  status: any;

  public countries: Country[];
  public respais:Pais;
  public user:any;
  public pais_id:any;

  datForm: FormGroup;
  public Editor = ClassicEditor;

  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private datosvictimaService: DatosvictimaService,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getPaisesList();
    // this.getDestallePais();
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.pais_id = resp.id;
     })
    this.getPaisSelected();

    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  getPaisSelected(){
    this.paisService.getPais(this.pais_id).subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  getPaisesList(){
    this.paisService.getCountries().subscribe(
      (resp:any) =>{
        this.countries = resp.paises;
        console.log(this.countries)

      }
    )
  }

  getData(){
    if (this.pais_id) {
      this.pageTitle = 'Edit Eventos';

      this.datosvictimaService.getDatosvictimaPais(this.pais_id).subscribe(
        (res:any) => {
          this.datForm.patchValue({
            fecha: res.evento?.fecha,
            lugar: res.evento?.lugar,
            hora: res.evento?.hora,
            direccion: res.evento?.direccion,
            ciudad: res.evento?.ciudad,
            pais_code: res.evento?.pais_code,
            id: res.evento?.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Eventos';
    }

    this.validacion();
  }

  validacion(){
    this.datForm = this.fb.group({
      id: [''],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      hora: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais_code: ['', Validators.required],
    });
  }



  get fecha() { return this.datForm.get('fecha'); }
  get lugar() { return this.datForm.get('lugar'); }
  get hora() { return this.datForm.get('hora'); }
  get direccion() { return this.datForm.get('direccion'); }
  get ciudad() { return this.datForm.get('ciudad'); }
  get pais_code() { return this.datForm.get('pais_code'); }

  onSubmit (form) {debugger
    const formData = new FormData();
    formData.append('fecha', this.datForm.get('fecha').value);
    formData.append('lugar', this.datForm.get('lugar').value);
    formData.append('hora', this.datForm.get('hora').value);
    formData.append('direccion', this.datForm.get('direccion').value);
    formData.append('ciudad', this.datForm.get('ciudad').value);
    formData.append('pais_code', this.datForm.get('pais_code').value);
    // formData.append('pais_id', this.pais_id);
    formData.append('user_id', this.user.id);

    const id = this.datForm.get('id').value;

    if (id) {
      this.datosvictimaService.updateDatosvictima(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se actualizó correctamente',
              text: ''
            });

          }
        },
        error => this.error = error
      );
    } else {
      this.datosvictimaService.createDatosvictima(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente',
              text: ''
            });

          }
        },
        error => this.error = error
      );
    }

    //console.log(this.datForm);
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  

  getDestallePais(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paisService.getPais(+id).subscribe((resp:any)=>{
      this.respais = resp;
    })
      }


}
