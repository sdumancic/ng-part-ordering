import { PartOrder } from '../../../models/part-order.model'
import { OrderDetailsHeaderVm } from './order-details-header.vm'

export function buildOrdersDetailHeaderVm (
  order: PartOrder
): OrderDetailsHeaderVm {

  return {
    orderNumber: order?.orderNumber,
    orderTypeCode: order?.orderTypeCode,
    orderStatusCode: order?.orderStatusCode,
    createdOn: order?.createdOn,
    totalAmount: order?.totalAmount,
    orderDealerId: order?.orderDealerId,
    deliveryDealerId: order?.deliveryDealerId,
    invoiceDealerId: order?.invoiceDealerId
  } as OrderDetailsHeaderVm

}
