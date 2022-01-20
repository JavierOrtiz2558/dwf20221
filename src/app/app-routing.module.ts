import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from '../app/modules/exchange-rate/component/exchange-rate/exchange-rate.component'
import { RegionComponent } from './modules/customer/component/region/region.component';
import { HomeComponent } from '../app/modules/home/component/home/home.component'
import { CategoryComponent } from './modules/product/component/category/category.component';
import { FilterComponent } from './modules/product/component/filter/filter.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductDetailComponent } from './modules/product/component/product-detail/product-detail.component';

const routes: Routes = [
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'region', component: RegionComponent},
  {path: '', component: HomeComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'filter', component: FilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
