import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'orders-overview',
    loadComponent: () => import('./features/orders-overview/container/orders-overview.component').then(m => m.OrdersOverviewComponent)
  },
  {
    path: 'order-details/:id',
    loadComponent: () => import('./features/order-details/container/order-details.component').then(m => m.OrderDetailsComponent)
  }
]
