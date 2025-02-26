import { Component, EventEmitter, input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'
import { MatGridListModule } from '@angular/material/grid-list'
import { CommonModule } from '@angular/common'
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card'
import { OrderDetailsHeaderVm } from '../store/order-details-header.vm'

@Component({
  selector: 'app-order-header',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule, MatCard, MatCardHeader, MatCardContent, MatCardModule],
  templateUrl: './order-header.component.html',
  styleUrl: './order-header.component.scss'
})
export class OrderHeaderComponent {
  readonly order = input.required<OrderDetailsHeaderVm>()

  @Output() deliveryDealerChange = new EventEmitter<number>()
  @Output() invoiceDealerChange = new EventEmitter<number>()
  @Output() orderStatusChange = new EventEmitter<string>()
  @Output() orderTypeChange = new EventEmitter<number>()
  @Output() saveHeader = new EventEmitter<void>()

  orderTypes = [
    { code: 1030, description: 'Stock Order' },
    { code: 1040, description: 'Special Order' }
  ]

  orderStatuses = [
    { code: '1', description: 'Pending' },
    { code: '2', description: 'Disponibilné' },
    { code: '3', description: 'Shipped' }
  ]

  orderDealers = [
    { id: 43403, number: '10820', info: 'AUTOTIP ZA' }
  ]

  deliveryDealers = [
    { id: 43403, number: '10820', info: 'AUTOTIP ZA' },
    { id: 43404, number: '10821', info: 'FAST CARS' }
  ]

  invoiceDealers = [
    { id: 43403, number: '10820', info: 'AUTOTIP ZA' },
    { id: 43404, number: '10821', info: 'FAST CARS' }
  ]
}
