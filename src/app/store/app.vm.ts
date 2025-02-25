import { Dealer } from '../models/dealer.model'

export type AppVm = {
  dealers: Dealer[]
  languages: string[],
  selectedDealer: Dealer | undefined,
  selectedLanguage: string | undefined
}
