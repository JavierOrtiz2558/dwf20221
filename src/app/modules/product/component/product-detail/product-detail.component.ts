import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/productImage';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from '../../_service/product-image.service';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

declare var $: any;

import Swal from 'sweetalert2';
import { CroppedEvent } from 'ngx-photo-editor';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  //Datos del producto
  product: Product = new Product();
  gtin: any = null;

  //categorias asociadas al producto
  categories: Category[] = [];
  category: Category = new Category();

  //Imagenes del producto
  images: ProductImage[] = [];
  image: ProductImage = new ProductImage();
  file: any;
  imageChangedEvent: any;
  base64: any;

  //Formulario para actualizar datos
  formulario = this.formBuilder.group({
    id_product: [''],
    gtin: ['', Validators.required],
    product: ['', Validators.required],
    description: [''],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    id_category: ['', Validators.required],
    status: [''],
  })

  formularioCategory = this.formBuilder.group({
    id_category: ['', Validators.required],
  })

  //Validacion de envio de informacion al registrar
  submitted = false;

  constructor(
    private product_service: ProductService,
    private product_image_service: ProductImageService,
    private category_service: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    this.getProduct(this.gtin);
  }

  getProduct(gtin: string){
    this.product_service.getProduct(gtin).subscribe(
      res => {
        this.product = res;
        this.getCategory(this.product.id_category);
        this.getProductImages(this.product.id_product);
      },
      err => console.log(err)
    )
  }

  onSubmit(){
    this.submitted = true;
    this.product_service.updateProduct(this.formulario.value).subscribe(
      res => {
        this.gtin = this.formulario.controls['gtin'].value;
        this.getProduct(this.gtin);
        this.router.navigate(['product-detail/'+this.gtin]);
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion exitosa!',
          showConfirmButton: false,
          timer: 1750
        })
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'El producto no puede ser actualizado',
          showConfirmButton: false,
          timer: 1750
        })
      }
    )
  }

  updateProduct(product: Product){
    this.formulario.controls['id_product'].setValue(product.id_product);
    this.formulario.controls['gtin'].setValue(product.gtin);
    this.formulario.controls['product'].setValue(product.product);
    this.formulario.controls['description'].setValue(product.description);
    this.formulario.controls['price'].setValue(product.price);
    this.formulario.controls['stock'].setValue(product.stock);
    this.formulario.controls['id_category'].setValue(product.id_category);
    this.formulario.controls['status'].setValue(product.status);
    $("#product_modal").modal("show");
  }

  get f() {
    return this.formulario.controls;
  }

  closeModal(){
    $("#product_modal").modal("hide");
    this.submitted = false;
  }

  //Read y update de Categoria del producto

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => console.log(err)
    )
  }

  getCategory(id_category: number){
    this.category_service.getCategory(id_category).subscribe(
      res => {
        this.category = res;
      },
      err => console.log(err)
    )
  }

  onSubmitCategory(){
    this.category = new Category();
    this.category.id_category = this.formularioCategory.controls['id_category'].value;
    this.product_service.updateProductCategory(this.product.id_product, this.category).subscribe(
      res => {
        this.getProduct(this.gtin);
        this.closeCategoryModal();
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion exitoso!',
          showConfirmButton: false,
          timer: 1750
        })
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'El producto no puede ser actualizado',
          showConfirmButton: false,
          timer: 1750
        })
      }
    )
  }

  updateProductCategory(){
    this.getCategories();
    this.formularioCategory.controls['id_category'].setValue(this.product.id_category);
    $("#category_modal").modal("show");
  }

  closeCategoryModal(){
    $("#category_modal").modal("hide");
    this.submitted = false;
  }

  //Read, Create y Delete de imagenes del producto

  getProductImages(id_product: number){
    this.product_image_service.getProductImages(id_product).subscribe(
      res => {
        this.images = res;
        console.log(this.images)
      },
      err => console.log(err)
    )
  }

  onSubmitImage(){
    this.image.id_product = this.product.id_product;
    this.product_image_service.createProductImage(this.image).subscribe(
      res => {
        this.getProductImages(this.product.id_product);
        this.closeImageModal();
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
          title: 'La imagen no puede ser cargada',
          showConfirmButton: false,
          timer: 1750
        })
      }
    )
  }

  uploadProductImage(){
    $("#image_modal").modal("show");
  }

  closeImageModal(){
    $("#image_modal").modal("hide");
    this.submitted = false;
  }

  fileChangeEvent(event: any){
    this.imageChangedEvent = event;
  }

  imageCropped(event: CroppedEvent){
    this.base64 = event.base64;
    this.image.image = this.base64;
  }

  deleteProductImage(id_product_image: number){
    Swal.fire({
      title: 'Deseas eliminar el Producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product_image_service.deleteProductImage(id_product_image).subscribe(
          res => {
            this.getProductImages(this.product.id_product);
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
              title: 'La imagen del producto no pudo ser eliminada',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }
}
