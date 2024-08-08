import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatExpansionModule],
  templateUrl: "./side-nav.component.html",
  styleUrl: "./side-nav.component.scss",
})
export class SideNavComponent {}
