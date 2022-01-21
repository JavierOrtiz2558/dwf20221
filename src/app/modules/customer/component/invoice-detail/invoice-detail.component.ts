import { Component, OnInit } from '@angular/core';
import { Factura } from '../../_model/factura';
import { Router } from '@angular/router';
import { InvoiceService } from '../../_service/invoice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  items: Factura[] = [];
  item: Factura = new Factura();
  id_invoice: any = null;

  submitted = false;

  constructor(
    private invoice_service: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_invoice = this.route.snapshot.paramMap.get('id_invoice');
  }

}
