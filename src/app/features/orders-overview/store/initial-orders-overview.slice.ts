import { PartOrder } from '../../../models/part-order.model'
import { Metadata } from '../../../models/orders-overview-response.model'

export interface InitialOrdersOverviewSlice {
  readonly orders: PartOrder[];
  readonly metadata: Metadata | null;
  readonly isBusy: boolean;
}

export const initialOrdersOverviewSlice: InitialOrdersOverviewSlice = {
  orders: [],
  metadata: null,
  isBusy: false,
}
