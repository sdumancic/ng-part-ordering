import { Component, inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { DialogData } from './dialog.data'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button'
import { FormsModule } from '@angular/forms'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-new-order-dialog',
  imports: [
    MatLabel,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    FormsModule,
    MatInput,
    MatDialogClose
  ],
  templateUrl: './new-order-dialog.component.html',
  styleUrl: './new-order-dialog.component.scss'
})
export class NewOrderDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewOrderDialogComponent>)
  readonly data = inject<DialogData>(MAT_DIALOG_DATA)

  onNoClick (): void {
    this.dialogRef.close()
  }
}
