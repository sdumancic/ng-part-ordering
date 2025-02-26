export type OrderDetailsPositionsVm = {
  readonly partNo: string,
  readonly partFranchiseCode: string,
  readonly partDescription: string,
  readonly amountOrdered: number
  readonly amountDelivered: number
  readonly gross: number
  readonly netPricePart: number
  readonly discountCode: string
  readonly discountRate: number
}
