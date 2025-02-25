import { Component, effect, inject, input, numberAttribute } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  readonly orderNumber = input.required({ transform: numberAttribute })
  readonly router = inject(Router)

  constructor () {
    effect(() => {console.log('here we must set order number in store to this.orderNumber()')})
  }

  navigateToCustomOrder (newOrderNumber: number) {
    this.router.navigate(['/order-details', newOrderNumber])
  }
}
