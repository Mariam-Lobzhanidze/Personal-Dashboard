import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { Todo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";
import { convert24HourTo12Hour, generateId } from "../../../shared/utils";
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
export class AddNewTodoComponent implements OnInit, AfterViewInit {
  @ViewChild(TimeSelectComponent)
  timeSelectComponent!: TimeSelectComponent;

  private isEdited = false;

  readonly minDate = new Date();

  private activeCategory!: string;
  public form!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<AddNewTodoComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: string;
      dueDate: Date;
      id: string;
      time: { hours: number; minutes: number; period: "AM" | "PM" };
    }
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control("", Validators.required),
      dueDate: this.fb.control("", Validators.required),
    });

    this.isEdited = !!this.data;

    if (this.isEdited) {
      this.form.patchValue(this.data);
    }

    this.getActiveCategory();
  }

  public ngAfterViewInit(): void {
    if (this.isEdited && this.timeSelectComponent) {
      const { hours, period } = convert24HourTo12Hour(this.data?.time.hours || 12);

      this.timeSelectComponent.selectedHour = hours;
      this.timeSelectComponent.selectedMinute = this.data?.time.minutes || 0;
      this.timeSelectComponent.period = period;

      this.cd.detectChanges();
    }
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
      hours: this.timeSelectComponent.selectedTime.hours,
      minutes: this.timeSelectComponent.selectedTime.minutes,
      period: this.timeSelectComponent.selectedTime.period,
    };

    if (toDoItem.dueDate) {
      // Schedule the reminder

      toDoItem?.dueDate?.setHours(toDoItem.hours, toDoItem.minutes);

      this.todoService.scheduleReminder(
        toDoItem.dueDate,
        toDoItem.createdAt,
        `Reminder: ${toDoItem?.description}`,
        "assets/sounds/reminder.wav"
      );
    }

    if (this.form.valid) {
      if (!this.isEdited) {
        this.todoService.addNewToDoItem(toDoItem);
      } else {
        this.todoService.updateToDoItem(this.data.id, {
          description: this.form.value.description,
          dueDate: this.form.value.dueDate,
          hours: toDoItem.hours,
          minutes: toDoItem.minutes,
          period: toDoItem.period,
        });
      }
      this.dialogRef.close();
    }
  }
}
