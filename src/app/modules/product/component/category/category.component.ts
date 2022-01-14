import { Component, OnInit } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  category: Category = new Category();
  formulario = this.formBuilder.group({
    id_category: [''],
    category: ['', Validators.required]
  });
  post_category = false;
  submitted = false;

  constructor(
    private cateory_service: CategoryService,
    private formBuilder: FormBuilder
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

  onSubmit(){
    this.submitted = true;
    if(this.post_category){
      this.cateory_service.createCategory(this.formulario.value).subscribe(
        res => {
          this.getCategories();
          this.closeModal();
        },
        err => console.log(err)
      )
    }else{
      this.cateory_service.updateCategory(this.formulario.value).subscribe(
        res => {
          this.getCategories();
          this.closeModal();
        },
        err => console.log(err)
      )
    }
  }

  createCategory(){
    this.post_category = true;
    this.formulario.reset();
    $("#category_modal").modal("show");
  }

  updateCategory(category: Category){
    this.post_category = false;
    this.formulario.controls['id_category'].setValue(category.id_category);
    this.formulario.controls['category'].setValue(category.category);
    $("#category_modal").modal("show");
  }

  deleteCategory(id_category: number){
    this.cateory_service.deleteCategory(id_category).subscribe(
      res => {
        this.getCategories();
      },
      err => console.log(err)
    )
  }

  get f() {
    return this.formulario.controls;
  }

  closeModal(){
    $("#category_modal").modal("hide");
    this.submitted = false;
  }
}
