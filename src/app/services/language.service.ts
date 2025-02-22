import { Injectable } from '@angular/core'
import { delay, Observable, of, tap } from 'rxjs'
import { ALL_LANGUAGES } from '../data/languages'

@Injectable({ providedIn: 'root' })
export class LanguageService {

  fetchLanguages$ (): Observable<string[]> {
    return of(ALL_LANGUAGES).pipe(
      tap(_ => console.log(`Started loading languages`)),
      delay(500),
      tap(_ => console.log(`Finished loading languages`)),
    )
  }
}
