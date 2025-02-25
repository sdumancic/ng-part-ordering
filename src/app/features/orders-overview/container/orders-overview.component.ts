import { Component, inject } from '@angular/core'
import { OrdersOverviewStore } from '../store/orders-overview.store'
import { OrdersOverviewTableComponent } from '../orders-overview-table/orders-overview-table.component'
import { PagingSortChangeEventModel } from '../../../models/paging-sort-change-event.model'
import { MatButton } from '@angular/material/button'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { NewOrderDialogComponent } from '../../new-order-dialog/new-order-dialog.component'
import { OrdersService } from '../../../services/orders.service'

@Component({
  selector: 'app-orders-overview',
  imports: [
    OrdersOverviewTableComponent,
    MatButton
  ],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss'
})
export class OrdersOverviewComponent {
  readonly store = inject(OrdersOverviewStore)
  readonly router = inject(Router)
  readonly dialog = inject(MatDialog)
  readonly ordersService = inject(OrdersService)

  onSortingPagingChanged (event: PagingSortChangeEventModel) {
    this.store.fetchOrders(event)
  }

  goHome () {
    this.router.navigate(['/'])
  }

  openNewOrderDialog () {
    const dialogRef = this.dialog.open(NewOrderDialogComponent, {
      data: { selectedDealer: this.store.selectedDealer() },
    })

    dialogRef.afterClosed().subscribe(dealer => {
      if (dealer) {
        //create new order and route to its details
        const newOrder = this.ordersService.createNewOrder(dealer)
        console.log(newOrder)
        this.router.navigate(['/order-details', newOrder.orderId])
      }
    })
  }

}
