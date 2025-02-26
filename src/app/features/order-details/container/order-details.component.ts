import { Component, effect, inject, input, numberAttribute } from '@angular/core'
import { OrderHeaderComponent } from '../order-header/order-header.component'
import { OrderPositionsComponent } from '../order-positions/order-positions.component'
import { OrderDetailStore } from '../store/order-details.store'

@Component({
  selector: 'app-order-details',
  imports: [
    OrderHeaderComponent,
    OrderPositionsComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  providers: [OrderDetailStore]
})
export class OrderDetailsComponent {
  readonly orderNumber = input.required({ transform: numberAttribute })
  readonly store = inject(OrderDetailStore)

  constructor () {
    effect(() => {
      this.store.setOrderNumber(this.orderNumber())
      this.store.fetchOrderAndPositions(this.orderNumber())
    })

  }

  onOrderTypeChange (event: number) {
    this.store.changeOrderType(event)
  }

  onOrderStatusChange (event: string) {
    this.store.changeStatus(event)
  }

  onDeliveryDealerChange (event: number) {
    this.store.changeDeliveryDealer(event)
  }

  onInvoiceDealerChange (event: number) {
    this.store.changeInvoiceDealer(event)
  }

  onSave () {
    this.store.saveOrder()
  }
}
