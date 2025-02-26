export type OrderPosition = {
  posId: number,
  orderId: number,
  partId: number,
  partNo: string,
  partFranchiseCode: string,
  partDescription: string,
  amountOrdered: number,
  amountDelivered: number,
  partPrices: PartPrice
}

export type PartPrice = {
  gross: number,
  netPricePart: number,
  surcharge: number,
  discountCode: string,
  discountRate: number
}
