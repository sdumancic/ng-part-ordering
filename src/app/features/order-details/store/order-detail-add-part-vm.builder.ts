import { Part } from '../../../models/part.model'

export function buildOrdersDetailAddPartVm (
  part: Part | null
) {
  return {
    partId: part?.partId ?? null,
    partNo: part?.partNo ?? null,
    partFranchiseCode: part?.partFranchiseCode ?? null,
    partDescription: part?.partDescription ?? null,
    grossPricePart: part?.grossPricePart ?? null,
    netPricePart: part?.netPricePart ?? null
  } as Part
}
