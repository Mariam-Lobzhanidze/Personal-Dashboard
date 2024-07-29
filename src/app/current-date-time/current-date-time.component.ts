import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-current-date-time",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./current-date-time.component.html",
  styleUrl: "./current-date-time.component.scss",
})
export class CurrentDateTimeComponent implements OnInit, OnDestroy {
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
