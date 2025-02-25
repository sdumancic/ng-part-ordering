import { AfterViewInit, Component, computed, EventEmitter, input, Output, ViewChild } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { merge, startWith } from 'rxjs'
import { PagingSortChangeEventModel } from '../../../models/paging-sort-change-event.model'
import { OrderOverviewItemVm } from '../view-model/order-overview-item.vm'

@Component({
  selector: 'app-orders-overview-table',
  imports: [
    MatProgressSpinner,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSortModule,
  ],
  templateUrl: './orders-overview-table.component.html',
  styleUrl: './orders-overview-table.component.scss'
})
export class OrdersOverviewTableComponent implements AfterViewInit {

  readonly orders = input.required<OrderOverviewItemVm[]>()
  readonly totalRecords = input.required<number>()
  @Output() sortingPagingChanged = new EventEmitter<PagingSortChangeEventModel>()

  readonly data = computed(() => this.orders())
  readonly resultsLength = computed(() => this.totalRecords())
  displayedColumns: string[] = ['orderNumber', 'orderTypeDescription', 'orderStatusDescription', 'orderDealerNumber', 'deliveryDealerNumber', 'deliveryDealerInfo', 'deliveryTypeDescription', 'invoiceDealerNumber', 'availableLimit']

  isLoadingResults = false

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  ngAfterViewInit () {

    this.sort?.sortChange.subscribe((s) => {
      this.paginator.pageIndex = 0
    })
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({})
      ).subscribe(_ =>
      this.sortingPagingChanged.emit({
        direction: this.sort.direction,
        active: this.sort.active,
        page: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      } as PagingSortChangeEventModel))

  }
}

