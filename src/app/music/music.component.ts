import { CommonModule } from "@angular/common";
import { Component, OnInit, SecurityContext } from "@angular/core";

import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { MusicService } from "./music.Service";

@Component({
  selector: "app-music",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"],
})
export class MusicComponent implements OnInit {
  public popularMusicVideos: any[] = [];
  public selectedVideoUrl: string = "";

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.getPopularMusic();
  }

  public getPopularMusic(): void {
    this.musicService.getMostPopularMusic("US", "10").subscribe((response) => {
      // console.log(response);
      this.popularMusicVideos = response.items;
      console.log(this.popularMusicVideos);
    });
  }

  public sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public playVideo(videoId: string): void {
    this.selectedVideoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
  }
}
