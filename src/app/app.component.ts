import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TabsComponent } from "./tabs/tabs.component";
import { interval, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TabsComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  public currentDate?: Date;
  private dateSubscription?: Subscription;

  public ngOnInit(): void {
    this.updateDateAndTime();

    this.dateSubscription = interval(1000).subscribe(() => this.updateDateAndTime());
  }

  private updateDateAndTime(): void {
    this.currentDate = new Date();
  }

  public ngOnDestroy(): void {
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }
}
