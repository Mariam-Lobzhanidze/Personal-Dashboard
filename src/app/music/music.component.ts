import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MusicService } from "./music.Service";

@Component({
  selector: "app-music",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"],
})
export class MusicComponent implements OnInit {
  public musicVideos: any[] = [];
  public popularMusicVideos: any[] = [];
  public selectedVideoUrl: string = "";

  constructor(private musicService: MusicService, private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.getPopularMusic();
    this.searchVideos("rihanna");
  }

  public getPopularMusic(): void {
    this.musicService.getMostPopularMusic("US", "10").subscribe((response) => {
      this.popularMusicVideos = response.items;
      console.log(this.popularMusicVideos);
    });
  }

  public sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public playVideo(videoId: string): void {
    this.selectedVideoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  public searchVideos(query: string): void {
    this.musicService.searchVideos(query).subscribe(
      (response) => {
        this.musicVideos = response.items.map((item: any) => {
          return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelId: item.snippet.channelId,
          };
        });
        console.log(this.musicVideos);
      },
      (error) => {
        console.error("Error fetching videos", error);
      }
    );
  }
}
