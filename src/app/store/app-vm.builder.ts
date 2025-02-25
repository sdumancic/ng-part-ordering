import { Dealer } from '../models/dealer.model'
import { AppVm } from './app.vm'

export function buildAppVm (
  dealers: Dealer[],
  languages: string[],
  selectedDealer: Dealer | undefined,
  selectedLanguage: string | undefined
): AppVm {

  return {
    dealers,
    languages,
    selectedDealer,
    selectedLanguage
  }

}
