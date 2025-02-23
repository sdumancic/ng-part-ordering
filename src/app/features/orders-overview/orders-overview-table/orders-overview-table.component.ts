import { AfterViewInit, Component, ViewChild } from '@angular/core'
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
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { DatePipe } from '@angular/common'

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
    DatePipe
  ],
  templateUrl: './orders-overview-table.component.html',
  styleUrl: './orders-overview-table.component.scss'
})
export class OrdersOverviewTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['created', 'state', 'number', 'title']
  data: any[] = []

  resultsLength = 0
  isLoadingResults = true
  isRateLimitReached = false

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  ngAfterViewInit () {

    // If the user changes the sort order, reset back to the first page.
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0))
    /*
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true
              return this.exampleDatabase!.getRepoIssues(
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
              ).pipe(catchError(() => observableOf(null)))
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false
              this.isRateLimitReached = data === null

              if (data === null) {
                return []
              }

              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
              this.resultsLength = data.total_count
              return data.items
            }),
          )
          .subscribe(data => (this.data = data))
          *
     */
  }
}

