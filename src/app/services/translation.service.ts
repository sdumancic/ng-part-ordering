import { Injectable } from '@angular/core'
import { delay, Observable, of, tap } from 'rxjs'
import { ALL_TRANSLATIONS } from '../data/translations'

@Injectable({ providedIn: 'root' })
export class TranslationService {

  fetchTranslations$ (language: string): Observable<Record<string, string>> {
    let newVar = ALL_TRANSLATIONS[language]
    return of(newVar).pipe(
      tap(_ => console.log('fetching translations')),
      delay(750),
      tap(translations => console.log('translations fetched ', translations))
    )
  }

  getTranslation (language: string, key: string): string {
    return ALL_TRANSLATIONS[language][key] || key
  }
}
