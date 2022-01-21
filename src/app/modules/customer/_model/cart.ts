export class Cart{
    id_cart: number;
    rfc: string;
    id_product: number;
    quantity: number;
    status: number;

    constructor(){
        this.id_cart = 0;
        this.rfc = "";
        this.id_product = 0;
        this.quantity = 0;
        this.status = 0;
    }
}