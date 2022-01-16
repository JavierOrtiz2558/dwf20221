import { Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { Category } from '../_model/category';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURI = ApisURI.dwf2021apiURI;
  private resource = "/product";
  private resourceRandom = "/product/random";

  constructor(
    private http: HttpClient
  ) { }

  getProducts(){
    return this.http.get<Product[]>(this.apiURI + this.resource);
  }

  getProduct(gtin: string){
    return this.http.get<Product>(this.apiURI + this.resource + `/${gtin}`);
  }

  createProduct(product: Product){
    return this.http.post(this.apiURI + this.resource, product);
  }

  updateProduct(product: Product){
    return this.http.put(this.apiURI + this.resource + `/${product.id_product}`, product);
  }

  deleteProduct(id_product: number){
    return this.http.delete(this.apiURI + this.resource + `/${id_product}`);
  }

  updateProductCategory(id_product: number, category: Category){
    return this.http.put(this.apiURI + this.resource + `/${id_product}` + "/category", category);
  }

  getProductsCategory(category: Category){
    this.http.get<Product[]>(this.apiURI + this.resource + `/${category.id_category}`);
  }

  getProductsRandom(){
    return this.http.get<Product[]>(this.apiURI + this.resourceRandom);
  }
}
