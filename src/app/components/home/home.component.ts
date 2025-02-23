import { Component, inject, OnInit } from '@angular/core'
import { AppToolbarComponent } from '../app-toolbar/app-toolbar.component'
import { AppStore } from '../../store/app.store'
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component'

@Component({
  selector: 'app-home',
  imports: [
    AppToolbarComponent,
    BusyIndicatorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly store = inject(AppStore)

  ngOnInit (): void {
    this.store.fetchMetadata()
  }
}
