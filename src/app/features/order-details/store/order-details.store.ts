import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals'
import { PartOrder } from '../../../models/part-order.model'
import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { filter, switchMap, tap } from 'rxjs'
import { OrdersService } from '../../../services/orders.service'
import { computed, inject } from '@angular/core'
import { AppStore } from '../../../store/app.store'
import { initialOrderDetailsSlice } from './order-details.slice'
import { OrderPosition } from '../../../models/order-position'
import {
  emptyPartInformation,
  setBusy,
  setDeliveryDealer,
  setInvoiceDealer,
  setNewPart,
  setOrderHeader,
  setOrderPositions,
  setOrderType,
  setStatus
} from './order-details.updaters'
import { tapResponse } from '@ngrx/operators'
import { NotificationService } from '../../../services/notification.service'
import { buildOrdersDetailHeaderVm } from './order-detail-header-vm.builder'
import { buildOrdersDetailPositionsVm } from './order-detail-positions-vm.builder'
import { PartService } from '../../../services/part.service'
import { buildOrdersDetailAddPartVm } from './order-detail-add-part-vm.builder'

export const OrderDetailStore = signalStore(
  withState(initialOrderDetailsSlice),
  withProps(_ => {
    return {
      _ordersService: inject(OrdersService),
      _appStore: inject(AppStore),
      _notificationService: inject(NotificationService),
      _partService: inject(PartService)
    }
  }),
  withComputed((store) => {
    return {
      orderDetailHeaderVm: computed(() => buildOrdersDetailHeaderVm(store.orderHeader()!)),
      orderDetailPositionsVm: computed(() => buildOrdersDetailPositionsVm(store.orderPositions()!)),
      buildOrdersDetailAddPartVm: computed(() => buildOrdersDetailAddPartVm(store.part())),
      orderHeaderId: computed(() => store.orderHeader()?.orderId),
      selectedDealerNumber: computed(() => store._appStore.selectedDealerNumber()),
      selectedDealer: computed(() => store._appStore.selectedDealer())
    }
  }),
  withMethods((store) => ({
    setOrderNumber (orderNumber: number): void {
      patchState(store, { orderNumber })
    },
    setOrderHeader (orderHeader: PartOrder): void {
      patchState(store, { orderHeader })
    },
    setOrderPositions (orderPositions: OrderPosition[]): void {
      patchState(store, { orderPositions })
    },
    changeOrderType (orderType: number): void {
      patchState(store, setOrderType(orderType))
    },
    changeStatus (statusCode: string): void {
      patchState(store, setStatus(statusCode))
    },
    changeDeliveryDealer (id: number): void {
      patchState(store, setDeliveryDealer(id))
    },
    changeInvoiceDealer (id: number): void {
      patchState(store, setInvoiceDealer(id))
    },
    clearPart (): void {
      patchState(store, emptyPartInformation())
    },
    fetchOrderAndPositions: rxMethod<number>(input$ => input$.pipe(
      tap(_ => patchState(store, setBusy(true))),
      //filter(_ => store._appStore.selectedDealerNumber() !== undefined),
      filter(_ => store.orderNumber !== null),
      switchMap(_ => store._ordersService.fetchOrder$(store.orderNumber()!)
        .pipe(
          tapResponse({
            next: (order) => {
              patchState(store, setOrderHeader(order))
            },
            error: err => {
              store._notificationService.error(`${err}`)
              patchState(store, setBusy(false))
            }
          })
        )),
      filter(_ => store.orderHeader !== undefined),
      switchMap(_ => store._ordersService.fetchPositions$(store.orderHeaderId()!).pipe(
        tapResponse({
          next: (positions) => {
            patchState(store, setOrderPositions(positions), setBusy(false))
          },
          error: err => {
            store._notificationService.error(`${err}`)
            patchState(store, setBusy(false))
          }
        })
      ))
    )),
    fetchPositions: rxMethod<number>(input$ => input$.pipe(
      tap(_ => patchState(store, setBusy(true))),
      filter(_ => store.orderHeaderId !== undefined),
      switchMap(orderId => store._ordersService.fetchPositions$(orderId)
        .pipe(
          tapResponse({
            next: (positions) => {
              patchState(store, setOrderPositions(positions), setBusy(false))
            },
            error: err => {
              store._notificationService.error(`${err}`)
              patchState(store, setBusy(false))
            }
          })
        )))),
    saveOrder: rxMethod<void>(input$ => input$.pipe(
      tap(_ => patchState(store, setBusy(true))),
      switchMap(response => store._ordersService.saveOrder$(store.orderHeader()!, store.orderPositions())
        .pipe(
          tapResponse({
            next: response => {
              store._notificationService.success('Order saved')
              patchState(store,
                setOrderHeader(response.updatedOrder),
                setOrderPositions(response.updatedPositions),
                setBusy(false))
            },
            error: err => {
              store._notificationService.error(`${err}`)
              patchState(store, setBusy(false))
            }
          })
        )))),
    searchPart: rxMethod<string>(input$ => input$.pipe(
      switchMap(partNumber => store._partService.searchPart$(partNumber)
        .pipe(
          tap(part => {
            if (!part) {
              store._notificationService.error(`Part not found: ${partNumber}`)
            } else {
              patchState(store, setNewPart(part))
            }
          })))
    )),
    addPartToPositions: rxMethod<void>(input$ => input$.pipe(
      switchMap(_ => store._ordersService.addPositionToOrder$(store.part(), store.orderHeaderId())
        .pipe(
          tap(positions => {
            patchState(store, setOrderPositions(positions)),
              patchState(store, emptyPartInformation())
          })))
    )),
  })),
  withDevtools('order-details-store'),
)
