import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals'
import { initialAppSlice } from './app.slice'
import { inject } from '@angular/core'
import { DealersService } from '../services/dealers.service'
import { LanguageService } from '../services/language.service'
import { firstValueFrom, forkJoin, switchMap, tap } from 'rxjs'
import { changeDealer, changeLanguage, setBusy, setDealers, setLanguages, setTranslations } from './app.updaters'
import { Dealer } from '../models/dealer.model'
import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { TranslationService } from '../services/translation.service'
import { NotificationService } from '../services/notification.service'
import { tapResponse } from '@ngrx/operators'

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps(_ => {
    const _dealerService = inject(DealersService)
    const _languageService = inject(LanguageService)
    const _translationService = inject(TranslationService)
    const _notificationService = inject(NotificationService)
    return {
      _dealerService,
      _languageService,
      _translationService,
      _notificationService
    }
  }),
  withMethods(store => {
    const _fetchDealers = async () => {
      console.log('fetching dealers')
      patchState(store, setBusy(true))
      const dealers = await firstValueFrom(store._dealerService.fetchDealers$())
      patchState(store, setBusy(false), setDealers(dealers))
    }
    const _fetchLanguages = rxMethod<void>(input$ => input$.pipe(
      tap(_ => console.log('fetching languages')),
      tap(_ => patchState(store, setBusy(true))),
      switchMap(_ => store._languageService.fetchLanguages$()
        .pipe(tap(langs => patchState(store, setLanguages(langs), setBusy(false)))
        ))))

    const _fetchMetadata = rxMethod<void>(input$ => input$.pipe(
      tap(_ => {
        console.log('fetching metadata')
        patchState(store, setBusy(true))
      }),
      switchMap(_ =>
        forkJoin([
          store._languageService.fetchLanguages$(),
          store._dealerService.fetchDealers$()
        ]).pipe(
          tap(([languages, dealers]) => patchState(store, setLanguages(languages), setDealers(dealers), setBusy(false)))
        ))
    ))

    const _fetchTranslations = rxMethod<string>(language$ => language$.pipe(
      tap(language => {
        patchState(store, setBusy(true))
        console.log('changing language and fetching translations for ', language)
        patchState(store, changeLanguage(language))
      }),
      switchMap(language => store._translationService.fetchTranslations$(language)
        .pipe(
          tapResponse({
            next: (translations) => patchState(store, setTranslations(translations), setBusy(false)),
            error: (err) => {
              store._notificationService.error(`${err}`)
              patchState(store, setBusy(false))
            }
          })
        ))
    ))

    return {
      changeDealer: (dealer: Dealer) => {
        patchState(store, changeDealer(dealer))
      },
      changeLanguage: (language: string) => {
        return _fetchTranslations(language)
      },
      translate: (key: string) => {
        return store._translationService.getTranslation(store.selectedLanguage(), key)
      },
      fetchDealers: async () => {
        await _fetchDealers()
      },
      fetchLanguages: () => _fetchLanguages(),
      fetchMetadata: () => {
        return _fetchMetadata()
      }
    }
  }),
  withDevtools('orders-global-store'),
)
