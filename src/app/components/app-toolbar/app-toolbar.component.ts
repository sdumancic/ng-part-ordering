import { Component, EventEmitter, input, Output } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CommonModule } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { Dealer } from '../../models/dealer.model'

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatButton],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent {
  readonly selectedDealer = input<Dealer | undefined>()
  readonly selectedLanguage = input<string>()
  readonly dealers = input<Dealer[]>()
  readonly languages = input<string[]>()

  @Output() dealerSelected = new EventEmitter<Dealer>()
  @Output() languageSelected = new EventEmitter<string>()

}
