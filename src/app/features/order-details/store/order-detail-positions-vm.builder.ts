import { OrderDetailsPositionsVm } from './order-details-positions.vm'
import { OrderPosition } from '../../../models/order-position'

export function buildOrdersDetailPositionsVm (
  positions: OrderPosition[]
): OrderDetailsPositionsVm[] {
  return positions.map(pos => {
    return {
      partNo: pos.partNo,
      partFranchiseCode: pos.partFranchiseCode,
      partDescription: pos.partDescription,
      amountOrdered: pos.amountOrdered,
      amountDelivered: pos.amountDelivered,
      gross: pos.partPrices?.gross,
      netPricePart: pos.partPrices?.netPricePart,
      discountCode: pos.partPrices?.discountCode,
      discountRate: pos.partPrices?.discountRate,
    }
  }) as OrderDetailsPositionsVm[]
}
