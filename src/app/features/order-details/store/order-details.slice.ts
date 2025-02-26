import { PartOrder } from '../../../models/part-order.model'
import { OrderPosition } from '../../../models/order-position'
import { Part } from '../../../models/part.model'

export interface OrderDetailsSlice {
  readonly isBusy: boolean;
  readonly orderNumber: number | null
  readonly orderHeader: PartOrder | null;
  readonly orderPositions: OrderPosition[] | [];
  readonly part: Part | null;
}

export const initialOrderDetailsSlice: OrderDetailsSlice = {
  orderNumber: null,
  orderHeader: null,
  orderPositions: [],
  isBusy: false,
  part: null

}
