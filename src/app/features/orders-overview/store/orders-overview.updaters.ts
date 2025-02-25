import { PartialStateUpdater } from '@ngrx/signals'
import { InitialOrdersOverviewSlice } from './initial-orders-overview.slice'
import { PartOrder } from '../../../models/part-order.model'
import { Metadata } from '../../../models/orders-overview-response.model'

export function setBusy (isBusy: boolean): PartialStateUpdater<InitialOrdersOverviewSlice> {
  return _ => ({ isBusy })
}

export function setPartOrders (orders: PartOrder[]): PartialStateUpdater<InitialOrdersOverviewSlice> {
  return _ => ({ orders: orders })
}

export function setMetadata (metadata: Metadata): PartialStateUpdater<InitialOrdersOverviewSlice> {
  return _ => ({ metadata: metadata })
}
