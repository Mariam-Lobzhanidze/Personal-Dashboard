import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-edit-menu",
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: "./edit-menu.component.html",
  styleUrl: "./edit-menu.component.scss",
})
export class EditMenuComponent {
  @Input() items: { icon: string; title: string }[] = [];
}
