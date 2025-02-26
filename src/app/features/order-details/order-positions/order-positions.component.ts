import { Component, computed, effect, EventEmitter, input, Output } from '@angular/core'
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card'
import { CommonModule } from '@angular/common'
import { OrderDetailsPositionsVm } from '../store/order-details-positions.vm'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Part } from '../../../models/part.model'

@Component({
  selector: 'app-order-positions',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './order-positions.component.html',
  styleUrl: './order-positions.component.scss'
})
export class OrderPositionsComponent {
  readonly positionsVm = input.required<OrderDetailsPositionsVm[]>()
  readonly newPartVm = input<Part>()
  readonly data = computed(() => this.positionsVm())
  readonly partNumber = input<number>()
  readonly partDescription = input<string>()

  @Output() searchPart = new EventEmitter<string>()
  @Output() clearPart = new EventEmitter<void>()
  @Output() addPart = new EventEmitter<void>()

  displayedColumns: string[] = ['partFranchiseCode', 'partNo', 'partDescription', 'amountOrdered', 'amountDelivered', 'gross', 'netPricePart', 'discountCode', 'discountRate']
  newPartNumber: string | undefined
  newPartDescription: string | undefined

  constructor () {
    effect(() => {
      this.newPartNumber = this.newPartVm()?.partNo
      this.newPartDescription = this.newPartVm()?.partDescription
    })
  }

  onAddPart () {
    this.addPart.emit()
  }

  onKeydown (event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.searchPart.emit(this.newPartNumber)
    }
  }
}
