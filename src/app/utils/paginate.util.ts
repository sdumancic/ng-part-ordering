export class PaginateUtil {
  static paginate<T> (items: T[], pageNumber: number, pageSize: number): T[] {
    const startIndex = (pageNumber) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }
}
