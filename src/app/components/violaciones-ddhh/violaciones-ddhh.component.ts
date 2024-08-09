import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

import { Violacionesddhh } from '../../models/violaciones';
import { ViolacionesddhhService } from '../../services/violaciones.service';
import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-violaciones-ddhh',
  templateUrl: './violaciones-ddhh.component.html',
  styleUrls: ['./violaciones-ddhh.component.css']
})
export class ViolacionesDdhhComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  violaciones:Violacionesddhh;
  public countries: Pais;
  public respais:Pais;

  vioForm: FormGroup;
  public Editor = ClassicEditor;

  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private violacionesddhhService: ViolacionesddhhService,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getPaisesList();
    this.getDestallePais();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = ' Editando violaciones data';
      this.violacionesddhhService.getViolacionesddhh(+id).subscribe(
        res => {
          this.vioForm.patchValue({
            violacionesDdhhTotal: res.violacionesDdhhTotal,
            clasificacionDCP: res.clasificacionDCP,
            clasificacionDESCA: res.clasificacionDESCA,
            calsificacionPueblos: res.calsificacionPueblos,
            lugar: res.lugar,
            breveDescripcion: res.breveDescripcion,
            numCasosCorteInterDDHH: res.numCasosCorteInterDDHH,
            numCasosComDHNU: res.numCasosComDHNU,
            casosNoAccionar: res.casosNoAccionar,
            pais_code: res.pais_code,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Creando violaciones data';
    }

    this.vioForm = this.fb.group({
      id: [''],
      violacionesDdhhTotal: ['', Validators.required],
      clasificacionDCP: ['', Validators.required],
      clasificacionDESCA: ['', Validators.required],
      calsificacionPueblos: ['', Validators.required],
      lugar: ['', Validators.required],
      breveDescripcion: ['', Validators.required],
      numCasosCorteInterDDHH: ['', Validators.required],
      numCasosComDHNU: ['', Validators.required],
      casosNoAccionar: ['', Validators.required],
      pais_code: ['', Validators.required],
    });


  }


  get violacionesDdhhTotal() { return this.vioForm.get('violacionesDdhhTotal'); }
  get clasificacionDCP() { return this.vioForm.get('clasificacionDCP'); }
  get clasificacionDESCA() { return this.vioForm.get('clasificacionDESCA'); }
  get calsificacionPueblos() { return this.vioForm.get('calsificacionPueblos'); }
  get lugar() { return this.vioForm.get('lugar'); }
  get breveDescripcion() { return this.vioForm.get('breveDescripcion'); }
  get numCasosCorteInterDDHH() { return this.vioForm.get('numCasosCorteInterDDHH'); }
  get numCasosComDHNU() { return this.vioForm.get('numCasosComDHNU'); }
  get casosNoAccionar() { return this.vioForm.get('casosNoAccionar'); }
  get pais_code() { return this.vioForm.get('pais_code'); }

  onSubmit (form) {
    const formData = new FormData();
    formData.append('violacionesDdhhTotal', this.vioForm.get('violacionesDdhhTotal').value);
    formData.append('clasificacionDCP', this.vioForm.get('clasificacionDCP').value);
    formData.append('clasificacionDESCA', this.vioForm.get('clasificacionDESCA').value);
    formData.append('calsificacionPueblos', this.vioForm.get('calsificacionPueblos').value);
    formData.append('lugar', this.vioForm.get('lugar').value);
    formData.append('breveDescripcion', this.vioForm.get('breveDescripcion').value);
    formData.append('numCasosCorteInterDDHH', this.vioForm.get('numCasosCorteInterDDHH').value);
    formData.append('numCasosComDHNU', this.vioForm.get('numCasosComDHNU').value);
    formData.append('casosNoAccionar', this.vioForm.get('casosNoAccionar').value);
    formData.append('pais_code', this.vioForm.get('pais_code').value);

    const id = this.vioForm.get('id').value;

    if (id) {
      this.violacionesddhhService.updateViolacionesddhh(formData, +id).subscribe(
        res => {
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
      this.violacionesddhhService.createViolacionesddhh(formData).subscribe(
        res => {
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
    //console.log(this.vioForm);
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPaisesList(){
    this.paisService.getCountries().subscribe(
      (resp:any) =>{
        this.countries = resp;
        //console.log(this.countries.title)

      }
    )
  }

  getDestallePais(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paisService.getPais(+id).subscribe((resp:any)=>{
      this.respais = resp;
    })
  }


}
