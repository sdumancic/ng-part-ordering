import { Component } from '@angular/core'
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-order-positions',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardModule
  ],
  templateUrl: './order-positions.component.html',
  styleUrl: './order-positions.component.scss'
})
export class OrderPositionsComponent {

}
