import { patchState, signalStore, type, withComputed, withMethods, withProps, withState } from '@ngrx/signals'
import {
  addEntities,
  addEntity,
  entityConfig,
  removeEntities,
  removeEntity,
  setAllEntities,
  withEntities
} from '@ngrx/signals/entities'
import { PartOrder } from '../../../models/part-order.model'
import { initialOrdersOverviewSlice } from './initial-orders-overview.slice'
import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { filter, switchMap, tap } from 'rxjs'
import { OrdersService } from '../../../services/orders.service'
import { computed, inject } from '@angular/core'
import { setBusy, setMetadata, setPartOrders } from './orders-overview.updaters'
import { PagingSortChangeEventModel } from '../../../models/paging-sort-change-event.model'
import { AppStore } from '../../../store/app.store'
import { buildOrdersOverviewVm } from './orders-overview-vm.builder'

const COLLECTION_NAME = 'orders'
const ordersOverviewConfig = entityConfig({
  entity: type<PartOrder>(),
  collection: COLLECTION_NAME,
  selectId: (order) => order.orderNumber
})

export const OrdersOverviewStore = signalStore(
  withState(initialOrdersOverviewSlice),
  withEntities(ordersOverviewConfig),
  withProps(_ => {
    return {
      _ordersService: inject(OrdersService),
      _appStore: inject(AppStore)
    }
  }),
  withComputed((store) => {
    return {
      ordersOverviewVm: computed(() => buildOrdersOverviewVm(store.orders(), store.metadata())),
      selectedDealerNumber: computed(() => store._appStore.selectedDealerNumber()),
      selectedDealer: computed(() => store._appStore.selectedDealer())
    }
  }),
  withMethods((store) => ({
    addOrder (order: PartOrder): void {
      patchState(store, addEntity(order, { collection: COLLECTION_NAME, selectId: (order) => order.orderNumber }))
    },
    addOrders (orders: PartOrder[]): void {
      patchState(store, addEntities(orders, { collection: COLLECTION_NAME, selectId: (order) => order.orderNumber }))
    },
    setAllOrders (orders: PartOrder[]): void {
      patchState(store, setAllEntities(orders, { collection: COLLECTION_NAME, selectId: (order) => order.orderNumber }))
    },
    removeOrder (id: number): void {
      patchState(store, removeEntity(id, { collection: COLLECTION_NAME }))
    },
    removeOrders (): void {
      patchState(store, removeEntities(store.ordersIds(), { collection: COLLECTION_NAME }))
    },
    fetchOrders: rxMethod<PagingSortChangeEventModel>(input$ => input$.pipe(
      tap(pagingSortingEventData => console.log('fetching orders ', store._appStore.selectedDealerNumber(), pagingSortingEventData)),
      tap(_ => patchState(store, setBusy(true))),
      filter(_ => store._appStore.selectedDealerNumber() !== undefined),
      switchMap(pagingSortingEventData => store._ordersService.fetchOrders$
      (store._appStore.selectedDealerNumber()!,
        pagingSortingEventData.page,
        pagingSortingEventData.pageSize,
        pagingSortingEventData.active,
        pagingSortingEventData.direction)
        .pipe(
          tap(orderResponse => patchState(store, setPartOrders(orderResponse.data), setMetadata(orderResponse.metadata), setBusy(false)))
        ))))
  })),
  withDevtools('orders-overview-store'),
)
