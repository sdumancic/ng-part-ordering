import { Component } from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-busy-indicator',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './busy-indicator.component.html',
  styleUrl: './busy-indicator.component.scss'
})
export class BusyIndicatorComponent {

}
