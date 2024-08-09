import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';
import { CrimeneslhService } from '../../services/crimeneslh.service';
import { Crimeneslh } from 'src/app/models/crimeneslh';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-crimene-lh',
  templateUrl: './crimene-lh.component.html',
  styleUrls: ['./crimene-lh.component.css']
})
export class CrimeneLhComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  crimenes:Crimeneslh;
  public countries: Pais;
  public respais:Pais;

  crimenesForm: FormGroup;
  public Editor = ClassicEditor;

  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  public editorDatac = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private crimeneslhService: CrimeneslhService,
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
      this.pageTitle = 'Edit crimenes data';
      this.crimeneslhService.getCrimeneslh(+id).subscribe(
        res => {
          this.crimenesForm.patchValue({
            crimeneslh: res.crimeneslh,
            clasificacionColectiva: res.clasificacionColectiva,
            clasificacionIndividual: res.clasificacionIndividual,
            lugar: res.lugar,
            breveDescripcion: res.breveDescripcion,
            numCasosCPIAprobados: res.numCasosCPIAprobados,
            numCasosCPIPendientes: res.numCasosCPIPendientes,
            numCasosNoCpiAprobado: res.numCasosNoCpiAprobado,
            numCasosNoCpiPendiente: res.numCasosNoCpiPendiente,
            pais_code: res.pais_code,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create crimenes data';
    }

    this.crimenesForm = this.fb.group({
      id: [''],
      crimeneslh: ['', Validators.required],
      clasificacionColectiva: ['', Validators.required],
      clasificacionIndividual: ['', Validators.required],
      lugar: ['', Validators.required],
      breveDescripcion: ['', Validators.required],
      numCasosCPIAprobados: ['', Validators.required],
      numCasosCPIPendientes: ['', Validators.required],
      numCasosNoCpiAprobado: ['', Validators.required],
      numCasosNoCpiPendiente: ['', Validators.required],
      pais_code: ['', Validators.required],
    });


  }


  get crimeneslh() { return this.crimenesForm.get('crimeneslh'); }
  get clasificacionColectiva() { return this.crimenesForm.get('clasificacionColectiva'); }
  get clasificacionIndividual() { return this.crimenesForm.get('clasificacionIndividual'); }
  get lugar() { return this.crimenesForm.get('lugar'); }
  get breveDescripcion() { return this.crimenesForm.get('breveDescripcion'); }
  get numCasosCPIAprobados() { return this.crimenesForm.get('numCasosCPIAprobados'); }
  get numCasosCPIPendientes() { return this.crimenesForm.get('numCasosCPIPendientes'); }
  get numCasosNoCpiAprobado() { return this.crimenesForm.get('numCasosNoCpiAprobado'); }
  get numCasosNoCpiPendiente() { return this.crimenesForm.get('numCasosNoCpiPendiente'); }
  get pais_code() { return this.crimenesForm.get('pais_code'); }

  onSubmit (form) {
    const formData = new FormData();
    formData.append('crimeneslh', this.crimenesForm.get('crimeneslh').value);
    formData.append('clasificacionColectiva', this.crimenesForm.get('clasificacionColectiva').value);
    formData.append('clasificacionIndividual', this.crimenesForm.get('clasificacionIndividual').value);
    formData.append('lugar', this.crimenesForm.get('lugar').value);
    formData.append('breveDescripcion', this.crimenesForm.get('breveDescripcion').value);
    formData.append('numCasosCPIAprobados', this.crimenesForm.get('numCasosCPIAprobados').value);
    formData.append('numCasosCPIPendientes', this.crimenesForm.get('numCasosCPIPendientes').value);
    formData.append('numCasosNoCpiAprobado', this.crimenesForm.get('numCasosNoCpiAprobado').value);
    formData.append('numCasosNoCpiPendiente', this.crimenesForm.get('numCasosNoCpiPendiente').value);
    formData.append('pais_code', this.crimenesForm.get('pais_code').value);


    const id = this.crimenesForm.get('id').value;

    if (id) {
      this.crimeneslhService.updateCrimeneslh(formData, +id).subscribe(
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
      this.crimeneslhService.createCrimeneslh(formData).subscribe(
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

    //console.log(this.crimenesForm);
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
