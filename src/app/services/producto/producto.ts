import { Proveedor } from "../proveedor/proveedor";

export interface Producto {
    id: number;
    codPro: String;
    nomPro: String;
    proveedor: Number;
    stock: Number; 
    precio : Number;
    fechaCompra: Date;
    objProveedor?: Proveedor;

}
