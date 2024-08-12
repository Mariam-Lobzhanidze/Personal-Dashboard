import { Component, Input } from "@angular/core";

import { Category } from "../../../interfaces/category.interface";
import { CommonModule } from "@angular/common";
import { EditMenuComponent } from "../../../shared/edit-menu/edit-menu.component";
import { TodoService } from "../../../services/todo.service";
import { AddCategoryComponent } from "../add-category/add-category.component";

@Component({
  selector: "app-to-do-category-tile",
  standalone: true,
  imports: [CommonModule, EditMenuComponent],
  templateUrl: "./category-tile.component.html",
  styleUrl: "./category-tile.component.scss",
})
export class CategoryTileComponent {
  @Input() toDoCategory?: Category;

  public menuItems: { icon: string; title: string }[] = [
    {
      icon: "/assets/icons/edit.svg",
      title: "edit",
    },
    {
      icon: "/assets/icons/delete.svg",
      title: "delete",
    },
  ];

  public constructor(private todoService: TodoService) {}

  public onMenuItemClicked(action: string) {
    switch (action) {
      case "edit":
        this.todoService.openDialog(AddCategoryComponent, {
          category: this.toDoCategory,
        });

        break;
      case "delete":
        this.todoService.deleteUserCategory(this.toDoCategory?.id);
        break;
      case "disable":
        break;
      case "enable":
        break;
    }
  }
}
