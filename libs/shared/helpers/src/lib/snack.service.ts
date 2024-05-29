import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private readonly snack = inject(MatSnackBar);
  private readonly config: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
  };

  showMessage(text: string): void {
    this.snack.open(text, undefined, this.config);
  }
}
