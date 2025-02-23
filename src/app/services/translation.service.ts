import { Injectable } from '@angular/core'
import { delay, Observable, of, switchMap, tap, throwError } from 'rxjs'
import { ALL_TRANSLATIONS } from '../data/translations'

@Injectable({ providedIn: 'root' })
export class TranslationService {

  fetchTranslations$ (language: string): Observable<Record<string, string>> {
    let newVar = ALL_TRANSLATIONS[language]
    return of(newVar).pipe(
      tap(_ => console.log('fetching translations')),
      delay(400),
      switchMap(_ => throwError(() => 'Translations not found')),
      tap(translations => console.log('translations fetched ', translations))
    )
  }

  getTranslation (language: string | undefined, key: string): string {
    return language == undefined ? key : ALL_TRANSLATIONS[language][key] || key
  }
}
