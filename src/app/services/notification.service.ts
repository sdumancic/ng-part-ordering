import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackbar = inject(MatSnackBar)

  success (message: string) {
    this.snackbar.open(message, 'Close', { duration: 3000, panelClass: 'success' })
  }

  error (message: string) {
    this.snackbar.open(message, 'Close', { duration: 3000, panelClass: 'error' })
  }

}
