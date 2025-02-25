import { Injectable } from '@angular/core'
import { Dealer } from '../models/dealer.model'
import { delay, Observable, of, tap } from 'rxjs'
import { ALL_DEALERS } from '../data/dealers'

@Injectable({ providedIn: 'root' })
export class DealersService {

  fetchDealers$ (): Observable<Dealer[]> {
    return of(ALL_DEALERS).pipe(
      tap(_ => console.log(`Started loading dealers`)),
      delay(300),
      tap(_ => console.log(`Finished loading dealers`)),
    )
  }
}
