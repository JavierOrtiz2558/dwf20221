import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //Datos del producto
  products: Product[] = [];

  //Categorias asociadas al producto
  categories: Category[] = [];

  //Formulario para registrar los datos del producto
  formulario = this.formBuilder.group({
    id_product: [''],
    gtin: ['', Validators.required],
    product: ['', Validators.required],
    description: [''],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    id_category: ['', Validators.required],
    status: [''],
  });

  //Validacion de envio de informacion al registrar
  submitted = false;

  constructor(
    private product_service: ProductService,
    private category_service: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  //Read, Create and Delete of Products

  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

  onSubmit(){
    this.submitted = true;
    if(this.formulario.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Faltan campos obligatorios por llenar',
        showConfirmButton: false,
        timer: 1750
      })
      return;
    }
    this.product_service.createProduct(this.formulario.value).subscribe(
      res => {
        this.getProducts();
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          showConfirmButton: false,
          timer: 1750
        })
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'El producto no puede ser registrado',
          showConfirmButton: false,
          timer: 1750
        })
      }
    )
  }

  createProduct(){
    this.getCategories();
    this.formulario.reset();
    this.formulario.controls['id_category'].setValue(0);
    $("#product_modal").modal("show");
  }

  get f() {
    return this.formulario.controls;
  }

  closeModal(){
    $("#product_modal").modal("hide");
    this.submitted = false;
  }

  deleteProduct(id_product: number){
    Swal.fire({
      title: 'Deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product_service.deleteProduct(id_product).subscribe(
          res => {
            this.getProducts();
            Swal.fire({
              icon: 'success',
              title: 'Eliminacion exitosa!',
              showConfirmButton: false,
              timer: 1750
            })
          },
          err => {console.log(err),
            Swal.fire({
              icon: 'error',
              title: 'No se puede eliminar el producto',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }

  //Read de categoria del producto

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;
        console.log(this.categories);
      },
      err => console.log(err)
    )
  }

  //redireccionar a detalle del producto

  productDetail(gtin: string){
    this.router.navigate(['product-detail/'+gtin]);
  }
}
