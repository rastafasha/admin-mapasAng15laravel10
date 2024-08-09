import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {Video} from '../../../models/video';
import { VideoService } from '../../../services/video.service';


@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.css']
})
export class VideoIndexComponent implements OnInit {


  titlepage = 'Video';
  videos: Video;
  video: Video;
  error: string;

  ServerUrl = environment.url_servicios;
  imageUrl = environment.url_media;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  constructor(
    public videoService: VideoService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.getVid();
    window.scrollTo(0, 0);

  }

  getVid(){
    this.videoService.getVideos().subscribe(
      (data: Video) => this.videos = data,
      error => this.error = error
    );
    console.log(this.videos);
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.videoService.deleteVideo(+id).subscribe(
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
