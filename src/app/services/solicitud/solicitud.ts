import { Producto } from "../proveedor/producto";


export interface Solicitud{

     id: number;
	 idPro: number;
	 cantidad: number;
	 idProveedor: number;
	 correo: String
	 fecha: Date;
	 descripcion: String;
	 objProducto?: Producto;
	
}