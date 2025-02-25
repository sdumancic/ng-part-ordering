import { PartOrder } from './part-order.model'

export interface OrdersOverviewResponse {
  'data': PartOrder[],
  'metadata': Metadata
}

export interface Metadata {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalItems: number
}
