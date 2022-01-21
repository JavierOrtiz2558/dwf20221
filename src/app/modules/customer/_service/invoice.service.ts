import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';
import { Factura } from 'src/app/modules/customer/_model/factura'
import { Pagos } from '../_model/pagos';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiURI = ApisURI.dwf2021apiURI;
  private resource = "/invoice";

  constructor(
    private http: HttpClient
  ) { }

  getFactura(rfc: string){
    return this.http.get<Pagos[]>(this.apiURI + this.resource + `/${rfc}`);
  }

  purchase(rfc: string){
    return this.http.post(this.apiURI + this.resource + `/${rfc}`, rfc);
  }

  getItems(id_invoice: number){
    return this.http.get<Factura[]>(this.apiURI + this.resource + "/item" + `/${id_invoice}`);
  }
}
