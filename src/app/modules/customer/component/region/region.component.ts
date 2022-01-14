import { Component, OnInit } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[] = [];
  region: Region = new Region();
  formulario = this.formBuilder.group({
    id_region: [""],
    region: ['', Validators.required]
  });
  post_region = false;
  submitted = false;

  constructor(
    private region_service: RegionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(){
    this.region_service.getRegions().subscribe(
      res => {
        this.regions = res;
        console.log(this.regions);
      },
      err => console.log(err)
    )
  }

  getRegion(id_region: number){
    this.region_service.getRegion(id_region).subscribe(
      res => {
        this.region = res;
        console.log(this.region);
      },
      err => console.log(err)
    )
  }

  onSubmit(){
    $("#region_modal").attr("disabled");
    this.region_service.createRegion(this.formulario.value).subscribe(
      res => {
        console.log(this.region);
        this.getRegions();
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          showConfirmButton: false,
          timer: 1750
        }) 
      },
      err => 
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        showConfirmButton: false,
        timer: 1750
      })
    )
    $("#region_modal").removeAttr("disabled");
  }

  onSubmitActu(){
    $("#actualiza_region").attr("disabled");
      this.region_service.updateRegion(this.formulario.value).subscribe(
        res => {
          console.log(this.region);
          this.getRegions();
          this.closeModalActualiza();
          Swal.fire({
            icon: 'success',
            title: 'Actualizacion exitosa!',
            showConfirmButton: false,
            timer: 1750
          })
        },
        err => 
        Swal.fire({
          icon: 'error',
          title: 'Actualizacion fallida',
          showConfirmButton: false,
          timer: 1750
        })
      )
      $("#actualiza_region").removeAttr("disabled");
  }

  createRegion(){
    
    this.formulario.reset();
    $("#region_modal").modal("show");
  }

  updateRegion(region: Region){
    
    this.formulario.reset();
    this.formulario.controls['id_region'].setValue(region.id_region);
    this.formulario.controls['region'].setValue(region.region);
    $("#actualiza_region").modal("show");
  }

  deleteRegion(id_region: number){
    Swal.fire({
      title: 'Deseas eliminar la Region?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.region_service.deleteRegion(id_region).subscribe(
          res => {
            console.log(this.region);
            this.getRegions();
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
              title: 'No se puede eliminar la Region',
              showConfirmButton: false,
              timer: 1750
            })}
        )
      }
    })
  }

  get f() {
    return this.formulario.controls;
  }

  closeModal(){
    $("#region_modal").modal("hide");
  }

  closeModalActualiza(){
    $("#actualiza_region").modal("hide");
  }

}
