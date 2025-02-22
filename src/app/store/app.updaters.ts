import { PartialStateUpdater } from '@ngrx/signals'
import { AppSlice } from './app.slice'
import { Dealer } from '../models/dealer.model'

export function setBusy (isBusy: boolean): PartialStateUpdater<AppSlice> {
  return _ => ({ isBusy })
}

export function setDealers (dealers: Dealer[]): PartialStateUpdater<AppSlice> {
  return _ => ({ dealers: dealers })
}

export function setLanguages (languages: string[]): PartialStateUpdater<AppSlice> {
  return _ => ({ languages: languages })
}

export function setTranslations (translations: Record<string, string>): PartialStateUpdater<AppSlice> {
  console.log('setting translations in updater', translations)
  return _ => ({ translations: translations })
}

export function changeDealer (dealer: Dealer): PartialStateUpdater<AppSlice> {
  return state => {
    return { selectedDealer: dealer }
  }
}

export function changeLanguage (language: string): PartialStateUpdater<AppSlice> {
  return state => {
    return { selectedLanguage: language }
  }
}
