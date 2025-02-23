import { Component } from '@angular/core'
import { OrdersOverviewTableComponent } from '../orders-overview-table/orders-overview-table.component'

@Component({
  selector: 'app-orders-overview',
  imports: [
    OrdersOverviewTableComponent
  ],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss'
})
export class OrdersOverviewComponent {

}
