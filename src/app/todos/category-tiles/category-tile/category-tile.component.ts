import { Component, Input } from "@angular/core";

import { Category } from "../../../interfaces/category.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-to-do-category-tile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./category-tile.component.html",
  styleUrl: "./category-tile.component.scss",
})
export class CategoryTileComponent {
  @Input() toDoCategory?: Category;
}
