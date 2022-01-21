import { Product } from "../../product/_model/product";

export class Carts{
    id_cart: number;
    rfc: string;
    id_product: number;
    quantity: number;
    status: number;
    product: Product;

    constructor(){
        this.id_cart = 0;
        this.rfc = "";
        this.id_product = 0;
        this.quantity = 0;
        this.status = 0;
        this.product = new Product();
    }
}