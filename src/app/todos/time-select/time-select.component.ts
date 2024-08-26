import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { convert12HourTo24Hour } from "../../shared/utils";

@Component({
  selector: "app-time-select",
  standalone: true,
  imports: [FormsModule, CommonModule, MatRadioModule, MatSelectModule],
  templateUrl: "./time-select.component.html",
  styleUrl: "./time-select.component.scss",
})
export class TimeSelectComponent {
  public selectedHour: number = 12;
  public selectedMinute: number = 0;
  public period: "AM" | "PM" = "PM";

  public hours = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString().padStart(2, "0"),
  }));

  public minutes = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  public constructor() {}

  public get selectedTime(): { hours: number; minutes: number; period: "AM" | "PM" } {
    const hours24 = convert12HourTo24Hour(this.selectedHour, this.period);

    return {
      hours: hours24,
      minutes: this.selectedMinute,
      period: this.period,
    };
  }
}
