import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modules/product/_model/category'; 
import { CategoryService } from 'src/app/modules/product/_service/category.service'; 
import { Carts } from 'src/app/modules/customer/_model/carts';
import { CartService } from 'src/app/modules/customer/_service/cart.service';
import { InvoiceService } from 'src/app/modules/customer/_service/invoice.service';

declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //categorias asociadas al producto
  categories: Category[] = [];
  category: Category = new Category();
  submitted = false;

  //agregar a carrito
  carts: Carts[] = [];
  cart: Carts = new Carts();
  articulos: number = 1;

  constructor(
    private cateory_service: CategoryService,
    private cart_service: CartService,
    private invoice_service: InvoiceService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCart("OIMF930721J93")
  }

  getCategories(){
    this.cateory_service.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => console.log(err)
    )
  }

  getCategory(id_category: number){
    this.cateory_service.getCategory(id_category).subscribe(
      res => {
        this.category = res;
      },
      err => console.log(err)
    )
  }

  onSubmit(){
    this.submitted = true;
    $("#cart_modal").modal("show");
  }

  closeModal(){
    $("#cart_modal").modal("hide");
    this.submitted = false;
  }

  removeFromCart(id_cart: number){
    Swal.fire({
      title: 'Deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cart_service.removeFromCart(id_cart).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminacion exitosa!',
              showConfirmButton: false,
              timer: 1750
            })
            this.closeModal();
            this.getCart("OIMF930721J93");
          },
          err => {console.log(err),
            Swal.fire({
              icon: 'error',
              title: 'El producto no pudo ser eliminado',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }

  getCart(rfc: string){
    this.cart_service.getCart(rfc).subscribe(
      res => {
        this.carts = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  deleteCart(rfc: string){
    Swal.fire({
      title: 'Deseas eliminar el Carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cart_service.deleteCart(rfc).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminacion exitosa!',
              showConfirmButton: false,
              timer: 1750
            })
            this.closeModal();
          },
          err => {console.log(err),
            Swal.fire({
              icon: 'error',
              title: 'El carrito no pudo ser eliminado',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }

  purchase(rfc: string){
    Swal.fire({
      title: 'Deseas realizar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoice_service.purchase(rfc).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Compra exitosa, revisa tus facturas!',
              showConfirmButton: false,
              timer: 1750
            })
            this.closeModal();
          },
          err => {console.log(err),
            Swal.fire({
              icon: 'error',
              title: 'La compra no se completo con exito',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }
}
