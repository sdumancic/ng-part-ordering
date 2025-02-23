import { Injectable } from '@angular/core'
import { delay, map, Observable, of } from 'rxjs'
import { OrdersOverviewResponse } from '../models/orders-overview-response.model'
import { ALL_ORDERS } from '../data/orders'
import { PaginateUtil } from '../utils/paginate.util'

@Injectable({ providedIn: 'root' })
export class OrdersService {

  fetchOrders$ (dealerNumber: string, pageNumber: number, pageSize: number): Observable<OrdersOverviewResponse> {
    return of(ALL_ORDERS).pipe(
      map(orders => orders.filter(order => order.orderDealerNumber === dealerNumber)),
      map(filteredOrders => {
        const totalItems = filteredOrders.length
        const totalPages = Math.ceil(totalItems / pageSize)
        const response: OrdersOverviewResponse = {
          data: PaginateUtil.paginate(filteredOrders, pageNumber, pageSize),
          metadata: {
            totalItems: totalItems,
            totalPages: totalPages,
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        }
        return response
      })
    )
  }

  fetchOrder$ (orderNumber: number) {
    const index = ALL_ORDERS.findIndex(order => order.orderNumber === orderNumber)
    if (index === -1) {
      throw new Error(`Order with number ${orderNumber} was not found`)
    }
    return of(ALL_ORDERS[index]).pipe(delay(100))
  }
}
