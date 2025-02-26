export type OrderDetailsHeaderVm = {
  readonly orderNumber: number,
  readonly orderTypeCode: number,
  readonly orderStatusCode: string,
  readonly createdOn: string
  readonly totalAmount: number
  readonly orderDealerId: number
  readonly deliveryDealerId: number
  readonly invoiceDealerId: number
}
