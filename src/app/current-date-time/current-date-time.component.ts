import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { interval, takeUntil } from "rxjs";
import { UnsubscribeComponent } from "../shared/unsubscribeComponent";

@Component({
  selector: "app-current-date-time",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./current-date-time.component.html",
  styleUrl: "./current-date-time.component.scss",
})
export class CurrentDateTimeComponent extends UnsubscribeComponent implements OnInit {
  public currentDate?: Date;

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    this.updateDateAndTime();

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateDateAndTime());
  }

  private updateDateAndTime(): void {
    this.currentDate = new Date();
  }
}
