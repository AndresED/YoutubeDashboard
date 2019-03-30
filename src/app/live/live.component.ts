import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  videoId:any;
  urlVideo:any;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe(params => {
      this.videoId = params['id'];
      this.urlVideo = this.transform();
      console.log(this.urlVideo);
    });
   }
  ngOnInit() {}
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}?autoplay=1`);
  }
}
