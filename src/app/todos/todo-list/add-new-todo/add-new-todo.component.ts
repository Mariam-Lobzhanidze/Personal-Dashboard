import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { Todo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";
import { generateId } from "../../../shared/utils";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TimeSelectComponent } from "../../time-select/time-select.component";

@Component({
  selector: "app-add-new-todo",
  standalone: true,
  imports: [
    TimeSelectComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    TimeSelectComponent,
  ],

  templateUrl: "./add-new-todo.component.html",
  styleUrl: "./add-new-todo.component.scss",
})
export class AddNewTodoComponent implements OnInit {
  @ViewChild(TimeSelectComponent)
  timeSelectComponent!: TimeSelectComponent;
  public selectedTime?: any;

  private isEdited = false;
  readonly minDate = new Date();
  private activeCategory!: string;
  public form!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<AddNewTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string; dueDate: Date; id: string }
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control("", Validators.required),
      dueDate: this.fb.control("",Validators.required),
    });

    this.isEdited = !!this.data;

    if (this.data) {
      this.form.patchValue(this.data);
    }

    this.getActiveCategory();
  }

  private getActiveCategory(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeCategory = params["category"];
    });
  }

  public submit() {
    const toDoItem: Todo = {
      id: generateId(),
      description: this.form.value.description,
      categoryName: this.activeCategory,
      completed: false,
      createdAt: new Date(),
      dueDate: this.form.value.dueDate,
    };

    if (toDoItem.dueDate) {
      // Schedule the reminder
      toDoItem?.dueDate?.setHours(
        this.timeSelectComponent?.selectedTime.hours,
        this.timeSelectComponent?.selectedTime.minutes
      );

      this.todoService.scheduleReminder(
        toDoItem.dueDate,
        `Reminder: ${toDoItem?.description}`,
        "assets/sounds/reminder.wav"
      );

      console.log(toDoItem.dueDate);
    }

    if (this.form.valid) {
      if (!this.isEdited) {
        this.todoService.addNewToDoItem(toDoItem);
      } else {
        this.todoService.updateToDoItem(this.data.id, {
          description: this.form.value.description,
          dueDate: this.form.value.dueDate,
        });
      }
      this.dialogRef.close();
    }
  }

  public onTimeSelected(time: { hours: number; minutes: number; period: "AM" | "PM" }) {
    this.selectedTime = time;
    console.log(this.selectedTime);
  }
}
