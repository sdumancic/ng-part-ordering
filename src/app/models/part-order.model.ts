export type PartOrder = {
  orderId: number
  orderNumber: number,
  orderTypeCode: number,
  orderTypeDescription: string,
  orderStatusCode: string,
  orderStatusDescription: string,
  orderDealerId: number,
  orderDealerNumber: string,
  createdOn: string,
  totalAmount: number,
  positionsCount: number,
  openPositionsCount: number,
  deliveryDealerInfo: string,
  deliveryDealerId: number,
  deliveryDealerNumber: string,
  deliveryTypeDescription: string,
  invoiceDealerInfo: string,
  invoiceDealerId: number,
  invoiceDealerNumber: string,
  partId: null,
  dealerReference: null,
  isPrintOrderConfirmationDisabled: boolean,
  isPrintLieferavisDisabled: boolean,
  availableLimit: number,
  text: string | null
}
