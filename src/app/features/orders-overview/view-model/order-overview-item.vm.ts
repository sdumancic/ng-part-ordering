export type OrderOverviewItemVm = {
  readonly orderNumber: number;
  readonly orderTypeDescription: string;
  readonly orderStatusDescription: string;
  readonly orderDealerNumber: string;
  readonly deliveryDealerNumber: string;
  readonly deliveryDealerInfo: string;
  readonly deliveryTypeDescription: string;
  readonly invoiceDealerNumber: string;
  readonly availableLimit: number;
}
