import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

import { PaisService } from '../../../services/pais.service';

import { Pais } from '../../../models/pais';
import { Country } from '../../../models/countries';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  id: any;

  public countries: Country;
  public respais:Pais;
  public pais_id:any;

  public status;
  public user:any;

  paisForm: FormGroup;

  // public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  // public editorDatac = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  public editorData = ClassicEditor;
  public editorDatac = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.getPaisesList();

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.pais_id = resp.id;
     })

     this.showPais();


  }

  showPais(){
    if (this.pais_id) {
      this.pageTitle = 'Edit Pais';
      this.paisService.getPais(this.pais_id).subscribe(
        (res:any) => {
          console.log(res);
          this.paisForm.patchValue({
            title: res.pais.title,
            code: res.pais.code,
            informacion: res.pais.informacion,
            ciudades: res.pais.ciudades,
            isActive: res.pais.isActive,
            id: res.pais.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Pais';
    }

    this.paisForm = this.fb.group({
      id: [''],
      title: [''],
      code: [''],
      informacion: [''],
      ciudades: [''],
      isActive: ['0'],
    });
  }


  get title() { return this.paisForm.get('title'); }
  get code() { return this.paisForm.get('code'); }
  get informacion() { return this.paisForm.get('informacion'); }
  get ciudades() { return this.paisForm.get('ciudades'); }
  get isActive() { return this.paisForm.get('isActive'); }

  onSubmit (form) {
    const formData = new FormData();
    formData.append('title', this.paisForm.get('title').value);
    formData.append('code', this.paisForm.get('code').value);
    formData.append('informacion', this.paisForm.get('informacion').value);
    formData.append('ciudades', this.paisForm.get('ciudades').value);
    formData.append('isActive', this.paisForm.get('isActive').value);
    formData.append('user_id', this.user.id);
    formData.append('pais_id', this.pais_id);

    const id = this.paisForm.get('id').value;

    if (id) {
      this.paisService.updatePais(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error' && res.data ) {
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
              title: 'Se Actualizó correctamente',
              text: ''
            });
          }
        },
        error => this.error = error
      );
    } else {
      this.paisService.createPais(formData).subscribe(
        (res:any) => {
          if (res.status === 'error' ) {
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
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPaisesList(){
    this.paisService.getCountries().subscribe(
      (resp:any) =>{
        this.countries = resp.paises;
        console.log(this.countries);

      }
    )
  }


}
