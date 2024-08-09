import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';
import { Prensa } from 'src/app/models/prensa';
import { PrensaService } from '../../../services/prensa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prensa-edit',
  templateUrl: './prensa-edit.component.html',
  styleUrls: ['./prensa-edit.component.css']
})
export class PrensaEditComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  prensas:Prensa
  prensa_id:number

  documentoForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private prensaService: PrensaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      this.prensa_id = resp.id;
     })
    // this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.iniciarFormulario();
    this.validarFormulario();
  }

  validarFormulario(){
    this.documentoForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      archivo: [''],
      is_active: [''],
    });
  }

  iniciarFormulario(){
    // const id = this.route.snapshot.paramMap.get('id');
    if (this.prensa_id) {
      this.pageTitle = 'Edit Artículo';
      this.prensaService.getPrensa(this.prensa_id).subscribe(
        (res:any) => {
          this.documentoForm.patchValue({
            title: res.prensa.title,
            description: res.prensa.description,
            is_active: res.prensa.is_active,
            id: res.prensa.id
          });
          this.imagePath = res.prensa.archivo;
        }
      );
    } else {
      this.pageTitle = 'Create Artículo';
    }
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentoForm.get('archivo').setValue(file);
    }
  }

  get title() { return this.documentoForm.get('title'); }
  get description() { return this.documentoForm.get('description'); }
  get is_active() { return this.documentoForm.get('is_active'); }
  get archivo() { return this.documentoForm.get('archivo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.documentoForm.get('title').value);
    formData.append('description', this.documentoForm.get('description').value);
    formData.append('is_active', this.documentoForm.get('is_active').value);
    formData.append('archivo', this.documentoForm.get('archivo').value);

    const id = this.documentoForm.get('id').value;

    if (id) {
      this.prensaService.updatPrensa(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!'
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Se Actualizó Correctamente!'
            });
            // this.router.navigate(['/prensa']);

          }
        },
        error => this.error = error
      );
    } else {
      this.prensaService.creatPrensa(formData).subscribe(
        res => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Se Creó Correctamente'
            });
            this.router.navigateByUrl('/prensa');
          }
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
