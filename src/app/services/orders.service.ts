import { Injectable } from '@angular/core'
import { delay, map, Observable, of } from 'rxjs'
import { OrdersOverviewResponse } from '../models/orders-overview-response.model'
import { ALL_ORDERS } from '../data/orders'
import { PaginateUtil } from '../utils/paginate.util'
import { SortDirection } from '@angular/material/sort'
import { PartOrder } from '../models/part-order.model'
import { Dealer } from '../models/dealer.model'

@Injectable({ providedIn: 'root' })
export class OrdersService {

  fetchOrders$ (
    dealerNumber: string,
    pageNumber: number,
    pageSize: number,
    active: string,
    direction: SortDirection
  ): Observable<OrdersOverviewResponse> {
    return of(ALL_ORDERS).pipe(
      map(orders => orders.filter(order => order.orderDealerNumber === dealerNumber)),
      map(filteredOrders => this.sortOrders(filteredOrders, active as keyof PartOrder, direction)),
      map(sortedOrders => {
        const totalItems = sortedOrders.length
        const totalPages = Math.ceil(totalItems / pageSize)
        const response: OrdersOverviewResponse = {
          data: PaginateUtil.paginate(sortedOrders, pageNumber, pageSize),
          metadata: {
            totalItems: totalItems,
            totalPages: totalPages,
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        }
        console.log(response)
        return response
      }),
    )
  }

  fetchOrder$ (orderNumber: number) {
    const index = ALL_ORDERS.findIndex(order => order.orderNumber === orderNumber)
    if (index === -1) {
      throw new Error(`Order with number ${orderNumber} was not found`)
    }
    return of(ALL_ORDERS[index]).pipe(delay(100))
  }

  createNewOrder (dealer: Dealer): PartOrder {

    return {
      orderId: this.findMaxOrderId(ALL_ORDERS) + 1,
      orderNumber: this.findMaxOrderNumber(ALL_ORDERS) + 1,
      orderTypeCode: 1030,
      orderTypeDescription: 'Stock Order',
      orderStatusCode: '2',
      orderStatusDescription: 'Disponibilné',
      orderDealerId: dealer.id,
      orderDealerNumber: dealer.number,
      createdOn: new Date().toISOString().slice(0, 19),
      totalAmount: 0,
      positionsCount: 0,
      openPositionsCount: 0,
      deliveryDealerInfo: dealer.name,
      deliveryDealerId: dealer.id,
      deliveryDealerNumber: dealer.number,
      deliveryTypeDescription: 'Night-Expr.',
      invoiceDealerInfo: dealer.name,
      invoiceDealerId: dealer.id,
      invoiceDealerNumber: dealer.number,
      partId: null,
      dealerReference: null,
      isPrintOrderConfirmationDisabled: true,
      isPrintLieferavisDisabled: true,
      availableLimit: 10000,
      text: null
    }
  }

  private sortOrders (orders: PartOrder[], active: keyof PartOrder, direction: SortDirection): PartOrder[] {
    return orders.sort((a, b) => {
      const valueA = a[active]
      const valueB = b[active]

      if (valueA === undefined || valueB === undefined) return 0

      // Convert values to string or number for safe comparison
      const valA = typeof valueA === 'number' ? valueA : String(valueA).toLowerCase()
      const valB = typeof valueB === 'number' ? valueB : String(valueB).toLowerCase()

      if (valA < valB) return direction === 'asc' ? -1 : 1
      if (valA > valB) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  private findMaxOrderId (orders: PartOrder[]): number {
    if (orders.length === 0) return 0
    return orders.reduce((max, order) => Math.max(max, order.orderId), orders[0].orderId)
  }

  private findMaxOrderNumber (orders: PartOrder[]): number {
    if (orders.length === 0) return 0
    return orders.reduce((max, order) => Math.max(max, order.orderNumber), orders[0].orderNumber)
  }

}
