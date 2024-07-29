import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TabsComponent } from "./tabs/tabs.component";
import { CurrentDateTimeComponent } from "./current-date-time/current-date-time.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TabsComponent, CurrentDateTimeComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
