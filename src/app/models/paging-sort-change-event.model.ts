import { SortDirection } from '@angular/material/sort'

export type PagingSortChangeEventModel = {
  direction: SortDirection,
  active: string,
  page: number,
  pageSize: number
}
