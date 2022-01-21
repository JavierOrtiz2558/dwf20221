import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from '../app/modules/exchange-rate/component/exchange-rate/exchange-rate.component'
import { RegionComponent } from './modules/customer/component/region/region.component';
import { HomeComponent } from '../app/modules/home/component/home/home.component'
import { CategoryComponent } from './modules/product/component/category/category.component';
import { FilterComponent } from './modules/product/component/filter/filter.component';
import { CartComponent } from './modules/customer/component/cart/cart.component';

const routes: Routes = [
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'region', component: RegionComponent},
  {path: '', component: HomeComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
