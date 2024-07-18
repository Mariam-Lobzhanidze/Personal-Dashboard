import { Component, Input } from "@angular/core";
import { Category } from "../../interfaces/category.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-to-do-category-tile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./to-do-category.component.html",
  styleUrl: "./to-do-category.component.scss",
})
export class ToDoCategoryTileComponent {
  @Input() public selectedCategoryId?: number;
  @Input() public category?: Category;

  public get isSelected(): boolean {
    return this.category?.id === this.selectedCategoryId;
  }
}
