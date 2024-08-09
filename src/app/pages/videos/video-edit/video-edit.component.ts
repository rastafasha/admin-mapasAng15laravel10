import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { VideoService } from '../../../services/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {


  pageTitle: string;
  error: string;
  uploadError: string;
  video: Video;

  videoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Video';
      this.videoService.getVideo(+id).subscribe(
        res => {
          this.videoForm.patchValue({
            title: res.title,
            video_review: res.video_review,
            is_active: res.is_active,
            is_featured: res.is_featured,
            id: res.id
          });

          this.video = res;
        }
      );
    } else {
      this.pageTitle = 'Create Video';
    }

    this.videoForm = this.fb.group({
      id: [''],
      title: [''],
      video_review: [''],
      is_active: ['1'],
      is_featured: ['1'],
    });
  }



  get title() { return this.videoForm.get('title'); }
  get video_review() { return this.videoForm.get('video_review'); }
  get is_featured() { return this.videoForm.get('is_featured'); }
  get is_active() { return this.videoForm.get('is_active'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.videoForm.get('title').value);
    formData.append('video_review', this.videoForm.get('video_review').value);
    formData.append('is_active', this.videoForm.get('is_active').value);
    formData.append('is_featured', this.videoForm.get('is_featured').value);

    const id = this.videoForm.get('id').value;

    if (id) {
      this.videoService.updatVideo(formData, +id).subscribe(
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
              text: 'Se Actualizó Correctamente'
            });
            // this.router.navigate(['/prensa']);

          }
        },
        error => this.error = error
      );
    } else {
      this.videoService.creatVideo(formData).subscribe(
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
              text: 'Se Creó Correctamente!'
            });
            this.router.navigateByUrl('/video');
          }
        },
        error => this.error = error
      );
    }
    console.log(this.videoForm.value)
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

}
