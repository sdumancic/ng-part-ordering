import { Routes } from '@angular/router'
import { OrdersOverviewStore } from './features/orders-overview/store/orders-overview.store'
import { OrderDetailStore } from './features/order-details/store/order-details.store'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'orders-overview',
    loadComponent: () => import('./features/orders-overview/container/orders-overview.component').then(m => m.OrdersOverviewComponent),
    providers: [OrdersOverviewStore]
  },
  {
    path: 'order-details/:orderNumber',
    loadComponent: () => import('./features/order-details/container/order-details.component').then(m => m.OrderDetailsComponent),
    providers: [OrderDetailStore]
  }
]
