import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: "app-time-select",
  standalone: true,
  imports: [FormsModule, CommonModule, MatRadioModule],
  templateUrl: "./time-select.component.html",
  styleUrl: "./time-select.component.scss",
})
export class TimeSelectComponent {
  public selectedHour: number = 0;
  public selectedMinute: number = 0;
  public period: "AM" | "PM" = "AM";

  public incrementHour(): void {
    this.selectedHour = (this.selectedHour % 12) + 1;
  }

  public decrementHour(): void {
    this.selectedHour = this.selectedHour === 1 ? 12 : this.selectedHour - 1;
  }

  public incrementMinute(): void {
    this.selectedMinute = (this.selectedMinute + 1) % 60;
    if (this.selectedMinute === 0) {
      this.incrementHour();
    }
  }

  public decrementMinute(): void {
    if (this.selectedMinute === 0) {
      this.selectedMinute = 59;
      this.decrementHour();
    } else {
      this.selectedMinute--;
    }
  }

  public get selectedTime(): { hours: number; minutes: number; period: "AM" | "PM" } {
    // Convert selectedHour to 24-hour format
    const hours24 =
      this.period === "PM" && this.selectedHour !== 12
        ? this.selectedHour + 12 // Convert PM hours except 12 PM to 24-hour format
        : this.period === "AM" && this.selectedHour === 12
        ? 0 // Convert 12 AM to 00:00 in 24-hour format (midnight)
        : this.selectedHour; // Keep the hour as it is for all other cases

    return {
      hours: hours24,
      minutes: this.selectedMinute,
      period: this.period,
    };
  }
}
