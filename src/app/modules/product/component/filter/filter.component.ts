import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/_model/product'; 
import { ProductService } from 'src/app/modules/product/_service/product.service'; 
import { ProductImageService } from 'src/app/modules/product/_service/product-image.service'; 
import { ProductImage } from 'src/app/modules/product/_model/productImage'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  productsCategory: Product[] = [];
  productCategory: Product = new Product();
  //Imagenes del producto
  images: ProductImage[] = [];

  id_category: any = null;

  constructor(
    private product_service: ProductService,
    private router: Router,
    private product_image_service: ProductImageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id_category = this.route.snapshot.paramMap.get('id_category');
    this.getProductsCategory(this.id_category);
  }

  getProductsCategory(id_category: number){
    this.product_service.getProductsCategory(id_category).subscribe(
      res => {
        this.productsCategory = res;
        this.getProductImages(this.productCategory.id_product);
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
