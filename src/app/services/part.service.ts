import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Part } from '../models/part.model'
import { ALL_PARTS } from '../data/parts'

@Injectable({ providedIn: 'root' })
export class PartService {

  searchPart$ (partNumber: string): Observable<Part | null> {
    const partIndex = ALL_PARTS.findIndex(part => part.partNo === partNumber)
    if (partIndex === -1) {
      return of(null)
    }
    return of(ALL_PARTS[partIndex])

  }
}
