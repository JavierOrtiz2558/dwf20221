import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/_model/product';  
import { ProductService } from 'src/app/modules/product/_service/product.service'; 
import { ProductImageService } from 'src/app/modules/product/_service/product-image.service'; 
import { ProductImage } from 'src/app/modules/product/_model/productImage'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsRamdom: Product[] = [];
  productRamdom: Product = new Product();

  //Imagenes del producto
  images: ProductImage[] = [];

  constructor(
    private product_service: ProductService,
    private router: Router,
    private product_image_service: ProductImageService,
  ) { }

  ngOnInit(): void {
    this.getProductsRandom();
  }

  getProductsRandom(){
    this.product_service.getProductsRandom().subscribe(
      res => {
        this.productsRamdom = res;
        this.getProductImages(this.productRamdom.id_product);
      },
      err => console.log(err)
    )
  }

  productDetail(gtin: string){
    this.router.navigate(['product-detail/'+gtin]);
  }

  getProductImages(id_product: number){
    this.product_image_service.getProductImages(id_product).subscribe(
      res => {
        this.images = res;
        console.log(this.images)
      },
      err => console.log(err)
    )
  }
}
