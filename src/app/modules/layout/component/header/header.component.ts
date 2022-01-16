import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modules/product/_model/category'; 
import { CategoryService } from 'src/app/modules/product/_service/category.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //categorias asociadas al producto
  categories: Category[] = [];
  category: Category = new Category();

  constructor(
    private cateory_service: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
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

}
