import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals'
import { initialAppSlice } from './app.slice'
import { computed, inject } from '@angular/core'
import { DealersService } from '../services/dealers.service'
import { LanguageService } from '../services/language.service'
import { firstValueFrom, forkJoin, switchMap, tap } from 'rxjs'
//import { changeDealer, changeLanguage, setBusy, setDealers, setLanguages, setTranslations } from './app.updaters'
import * as updaters from './app.updaters'
import { Dealer } from '../models/dealer.model'
import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { TranslationService } from '../services/translation.service'
import { NotificationService } from '../services/notification.service'
import { tapResponse } from '@ngrx/operators'
import { buildAppVm } from './app-vm.builder'

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
  withComputed((store) => {
    return {
      selectedDealerNumber: computed(() => store.selectedDealer()?.number ?? '10820'),
      appVm: computed(() => buildAppVm(store.dealers(), store.languages(), store.selectedDealer(), store.selectedLanguage()))
    }
  }),
  withMethods(store => {
    const _fetchDealers = async () => {
      console.log('fetching dealers')
      patchState(store, updaters.setBusy(true))
      const dealers = await firstValueFrom(store._dealerService.fetchDealers$())
      patchState(store, updaters.setBusy(false), updaters.setDealers(dealers))
    }
    const _fetchLanguages = rxMethod<void>(input$ => input$.pipe(
      tap(_ => console.log('fetching languages')),
      tap(_ => patchState(store, updaters.setBusy(true))),
      switchMap(_ => store._languageService.fetchLanguages$()
        .pipe(tap(langs => patchState(store, updaters.setLanguages(langs), updaters.setBusy(false)))
        ))))

    const _fetchMetadata = rxMethod<void>(input$ => input$.pipe(
      tap(_ => {
        console.log('fetching metadata')
        patchState(store, updaters.setBusy(true))
      }),
      switchMap(_ =>
        forkJoin([
          store._languageService.fetchLanguages$(),
          store._dealerService.fetchDealers$()
        ]).pipe(
          tapResponse({
            next: ([languages, dealers]) => {
              patchState(store, updaters.setLanguages(languages), updaters.setDealers(dealers), updaters.setBusy(false))
            },
            error: err => {
              store._notificationService.error(`${err}`)
              patchState(store, updaters.setBusy(false))
            }
          })
        ))
    ))

    const _fetchTranslations = rxMethod<string>(language$ => language$.pipe(
      tap(language => {
        patchState(store, updaters.setBusy(true))
        console.log('changing language and fetching translations for ', language)
        patchState(store, updaters.changeLanguage(language))
      }),
      switchMap(language => store._translationService.fetchTranslations$(language)
        .pipe(
          tapResponse({
            next: (translations) => patchState(store, updaters.setTranslations(translations), updaters.setBusy(false)),
            error: (err) => {
              store._notificationService.error(`${err}`)
              patchState(store, updaters.setBusy(false))
            }
          })
        ))
    ))

    return {
      changeDealer: (dealer: Dealer) => patchState(store, updaters.changeDealer(dealer)),

      changeLanguage: (language: string) => _fetchTranslations(language),

      translate: (key: string): string => store._translationService.getTranslation(store.selectedLanguage(), key),

      fetchDealers: async () => _fetchDealers(),

      fetchLanguages: () => _fetchLanguages(),

      fetchMetadata: () => _fetchMetadata()
    }
  }),
  withDevtools('orders-global-store'),
)
