import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MusicService } from "./music.Service";
import { TruncatePipe } from "../pipes/truncate.pipe";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-music",
  standalone: true,
  imports: [CommonModule, TruncatePipe, FormsModule],
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"],
})
export class MusicComponent implements OnInit {
  public searchQuery: string = "madonna";
  public musicVideos: any[] = [];
  public selectedVideoUrl: string = "";

  constructor(
    private musicService: MusicService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (this.searchQuery) {
      this.onSearchMusic();
    }

    // console.log("reloaded");
  }

  public onQueryChange(value: string): void {
    console.log("Input changed:", value);
  }

  public onSearchMusic(): void {
    this.musicService.searchVideos(this.searchQuery).subscribe(
      (response) => {
        this.musicVideos = response.items.map((item: any) => {
          return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            // singer: item.snippet.title.split("-")[0]?.trim(),
            thumbnail: item.snippet.thumbnails.medium.url,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
          };
        });
        console.log(this.musicVideos);
      },
      (error) => {
        console.error("Error fetching videos", error);
      }
    );
  }

  public sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public playVideo(videoId: string): void {
    if (this.searchQuery) {
      this.router.navigate([], {
        queryParams: { query: this.searchQuery },
        queryParamsHandling: "merge",
      });
    }

    this.selectedVideoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
}
