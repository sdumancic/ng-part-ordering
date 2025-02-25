import { OrdersOverviewVm } from './orders-overview.vm'
import { PartOrder } from '../../../models/part-order.model'
import { Metadata } from '../../../models/orders-overview-response.model'
import { OrderOverviewItemVm } from '../view-model/order-overview-item.vm'

export function buildOrdersOverviewVm (
  orders: PartOrder[],
  metadata: Metadata | null
): OrdersOverviewVm {

  return {
    orders: orders.map(order => {
      return {
        orderNumber: order.orderNumber,
        orderTypeDescription: order.orderTypeDescription,
        orderStatusDescription: order.orderStatusDescription,
        orderDealerNumber: order.orderDealerNumber,
        deliveryDealerNumber: order.deliveryDealerNumber,
        deliveryDealerInfo: order.deliveryDealerInfo,
        deliveryTypeDescription: order.deliveryTypeDescription,
        invoiceDealerNumber: order.invoiceDealerNumber,
        availableLimit: order.availableLimit
      } as OrderOverviewItemVm
    }),
    pageNumber: metadata?.pageNumber ?? 0,
    pageSize: metadata?.pageSize ?? 10,
    totalPages: metadata?.totalPages ?? 0,
    totalItems: metadata?.totalItems ?? 0
  }

}
