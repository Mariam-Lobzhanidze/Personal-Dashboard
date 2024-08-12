import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { generateId } from "../../../shared/utils";
import { Category } from "../../../interfaces/category.interface";
import { TodoService } from "../../../services/todo.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-category",
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: "./add-category.component.html",
  styleUrl: "./add-category.component.scss",
})
export class AddCategoryComponent implements OnInit {
  private isEdited = false;
  public newCategory?: string;

  public constructor(
    private todoService: TodoService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {}

  public ngOnInit(): void {
    this.isEdited = !!this.data;

    if (this.data) {
      this.newCategory = this.data.category.title;
    }
  }

  public onAddCategory(value: { newCategory: string }): void {
    const userCategory: Category = {
      id: generateId(),
      title: value.newCategory,
      activeTodosCount: 0,
      type: "user",
    };
    if (this.newCategory) {
      if (!this.isEdited) {
        this.todoService.addUserCategory(userCategory);
        this.dialogRef.close();
      } else {
        this.todoService.updateUserCategory(this.data.category.id, { title: this.newCategory });
        this.dialogRef.close();
      }
    }

    this.newCategory = "";
  }
}
