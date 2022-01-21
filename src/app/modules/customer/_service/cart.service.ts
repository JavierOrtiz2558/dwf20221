import { Injectable } from '@angular/core';
import { Cart } from '../_model/cart';
import { Carts } from '../_model/carts';
import { Customer } from '../_model/customerImage';
import { Product } from '../../product/_model/product';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiURI = ApisURI.dwf2021apiURI;
  private resource = "/cart";

  constructor(
    private http: HttpClient
  ) { }

  addToCart(cart: Cart){
    return this.http.post(this.apiURI + this.resource, cart);
  }

  removeFromCart(id_cart: number){
    return this.http.delete(this.apiURI + this.resource + `/${id_cart}`);
  }

  getCart(rfc: string){
    return this.http.get<Carts[]>(this.apiURI + this.resource + `/${rfc}`);
  }

  deleteCart(rfc: string){
    return this.http.delete(this.apiURI + this.resource + "/clear" + `/${rfc}`);
  }
}
