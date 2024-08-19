import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public showSnackbar(
    message: string,
    duration: number,
    verticalPosition: MatSnackBarVerticalPosition | undefined
  ): void {
    this.snackBar.open(message, "Close", {
      duration,
      verticalPosition,
    });
  }

  public openDialog<T>(component: ComponentType<T>, data?: unknown): MatDialogRef<T> {
    return this.dialog.open(component, {
      width: "300px",
      panelClass: "my-dialog",
      data: data,
    });
  }
}
