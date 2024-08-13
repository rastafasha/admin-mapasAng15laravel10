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
  public pa_assessmentgroup:any = [{}];;
  
  public status;
  public user:any;
  public ciudad:any;
  public ciudadesList:any = [{}];
  public ciudades:any;
  public ubicacion:any;
  public hora:any;

  paisForm: FormGroup;

  tareaSelected:any =null;
  paisSelected:any ;
  selected_option: any = 1;
  public family_edit: any = [];

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

          this.ciudades = res.ciudades;

          this.ciudades = res.ciudades ? res.ciudades : null;// ?
          let jsonObj = JSON.parse(this.ciudades) || '';
          this.ciudadesList = jsonObj;

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
  // get ciudades() { return this.paisForm.get('ciudades'); }
  get isActive() { return this.paisForm.get('isActive'); }

  saveGoal () {debugger
    const formData = new FormData();
    formData.append('title', this.paisForm.get('title').value);
    formData.append('code', this.paisForm.get('code').value);
    formData.append('informacion', this.paisForm.get('informacion').value);
    formData.append('ciudades', JSON.stringify(this.ciudadesList));
    // formData.append('ciudades', this.paisForm.get('ciudades').value);
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
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente',
              text: ''
            });
            this.router.navigate(['/dashboard/paises']);
            // this.ngOnInit();

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


  //listas
  addSTOGoal(){
    this.ciudadesList.push({
      ciudad: this.ciudad,
      ubicacion: this.ubicacion,
      hora: this.hora,
    })
    this.ciudad = '';
    this.ubicacion = '';
    this.hora = '';
  }

  deleteSTOGoal(i:any){
    this.ciudadesList.splice(i,1);
  }

  selectedOption(value:number){
    this.selected_option = value
  }

  seleccionarParaEdit(ciud:any){
    this.family_edit = ciud;
    console.log(this.family_edit);
        
    
  }

  selectedDireccion(todo:any){
    this.tareaSelected = todo
  }

  cambiarStatus(ciud:any){
    this.family_edit = ciud;
        Swal.fire('Actualizad', `Actualizado item de la lista, ahora por favor pulsa el boton salvar!`, 'success');
    
  }


}
