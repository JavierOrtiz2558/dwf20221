import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './component/region/region.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { CartComponent } from './component/cart/cart.component';



@NgModule({
  declarations: [
    RegionComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule
  ],
  exports: [
    RegionComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CartComponent
  ]
})
export class CustomerModule { }
