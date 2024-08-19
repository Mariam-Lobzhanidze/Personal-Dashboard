import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-edit-menu",
  standalone: true,
  imports: [MatMenuModule, CommonModule],
  templateUrl: "./edit-menu.component.html",
  styleUrl: "./edit-menu.component.scss",
})
export class EditMenuComponent {
  @Input() public items: { icon: string; title: string }[] = [];

  @Output() public menuItemClicked = new EventEmitter<string>();

  public onMenuItemClick(title: string): void {
    this.menuItemClicked.emit(title);
  }
}
