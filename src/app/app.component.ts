import { Component, inject, OnInit } from '@angular/core'
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component'
import { AppStore } from './store/app.store'
import { RouterOutlet } from '@angular/router'
import { BusyIndicatorComponent } from './components/busy-indicator/busy-indicator.component'

@Component({
  selector: 'app-root',
  imports: [AppToolbarComponent, RouterOutlet, BusyIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng-part-ordering'
  readonly store = inject(AppStore)

  ngOnInit (): void {
    this.store.fetchMetadata()
  }
}
