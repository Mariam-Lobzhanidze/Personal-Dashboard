import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  private apiKey = "AIzaSyDLsQ-gsqqRg_vdS9K77LEf0rhwGlz73a0";
  private baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  private searchUrl = "https://www.googleapis.com/youtube/v3/search";
  constructor(private http: HttpClient) {}

  public getMostPopularMusic(regionCode: string, videoCategoryId: string): Observable<any> {
    const url = `${this.baseUrl}?part=snippet&chart=mostPopular&regionCode=${regionCode}&videoCategoryId=${videoCategoryId}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
