import { Dealer } from '../models/dealer.model'

export interface AppSlice {
  readonly dealers: Dealer[];
  readonly selectedDealer: Dealer | undefined;
  readonly languages: string[];
  readonly selectedLanguage: string | undefined;
  readonly isBusy: boolean;
  readonly translations: Record<string, string>
}

export const initialAppSlice: AppSlice = {
  dealers: [],
  selectedDealer: undefined,
  languages: [],
  selectedLanguage: undefined,
  isBusy: false,
  translations: {}
}
