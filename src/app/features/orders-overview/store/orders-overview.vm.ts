import { OrderOverviewItemVm } from '../view-model/order-overview-item.vm'

export type OrdersOverviewVm = {
  readonly orders: OrderOverviewItemVm[]
  readonly pageNumber: number
  readonly pageSize: number
  readonly totalPages: number
  readonly totalItems: number
}
