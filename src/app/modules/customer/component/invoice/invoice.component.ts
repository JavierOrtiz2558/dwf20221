import { Component, OnInit } from '@angular/core';
import { Pagos } from '../../_model/pagos';
import { Router } from '@angular/router';
import { InvoiceService } from '../../_service/invoice.service';

declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  pagos: Pagos[] = [];
  pago: Pagos = new Pagos();

  submitted = false;

  constructor(
    private invoice_service: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFactura("OIMF930721J93");
  }

  getFactura(rfc: string){
    this.invoice_service.getFactura(rfc).subscribe(
      res => {
        this.pagos = res;
      },
      err => console.log(err)
    )
  }

  invoiceDetail(id_invoice: number){
    this.router.navigate(['invoice/item/'+id_invoice]);
  }
}
