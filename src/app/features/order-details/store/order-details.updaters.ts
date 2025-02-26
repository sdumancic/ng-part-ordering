import { PartialStateUpdater } from '@ngrx/signals'
import { PartOrder } from '../../../models/part-order.model'
import { OrderDetailsSlice } from './order-details.slice'
import { OrderPosition } from '../../../models/order-position'

export function setBusy (isBusy: boolean): PartialStateUpdater<OrderDetailsSlice> {
  return _ => ({ isBusy })
}

export function setOrderHeader (order: PartOrder): PartialStateUpdater<OrderDetailsSlice> {
  return _ => ({ orderHeader: order })
}

export function setOrderPositions (positions: OrderPosition[]): PartialStateUpdater<OrderDetailsSlice> {
  return _ => ({ orderPositions: positions })
}

export function setOrderType (orderType: number): PartialStateUpdater<OrderDetailsSlice> {
  return state => ({
    orderHeader: {
      ...state.orderHeader!,
      orderTypeCode: orderType,
      orderTypeDescription: '',
    }
  })
}

export function setStatus (status: string): PartialStateUpdater<OrderDetailsSlice> {
  return state => ({
    orderHeader: {
      ...state.orderHeader!,
      orderStatusCode: status,
      orderStatusDescription: ''
    }
  })
}

export function setDeliveryDealer (deliveryDealerId: number): PartialStateUpdater<OrderDetailsSlice> {
  return state => ({
    orderHeader: {
      ...state.orderHeader!,
      deliveryDealerId: deliveryDealerId,
      deliveryDealerNumber: '',
      deliveryDealerInfo: ''
    }
  })
}

export function setInvoiceDealer (invoiceDealerId: number): PartialStateUpdater<OrderDetailsSlice> {
  return state => ({
    orderHeader: {
      ...state.orderHeader!,
      invoiceDealerId: invoiceDealerId,
      invoiceDealerNumber: '',
      invoiceDealerInfo: ''
    }
  })
}
