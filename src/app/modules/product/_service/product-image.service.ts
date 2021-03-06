import { Injectable } from '@angular/core';
import { ProductImage } from '../_model/productImage';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private apiURI = ApisURI.dwf2021apiURI;
  private resource = "/product-image/";

  constructor(
    private http: HttpClient
  ) { }

  getProductImages(id_product: number){
    return this.http.get<ProductImage[]>(this.apiURI + this.resource + `${id_product}`);
  }

  createProductImage(product_image: ProductImage){
    return this.http.post(this.apiURI + this.resource, product_image);
  }

  deleteProductImage(id_product_image: number){
    return this.http.delete(this.apiURI + this.resource + `/${id_product_image}`);
  }
}
