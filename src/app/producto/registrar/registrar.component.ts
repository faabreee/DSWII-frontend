import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  proveedores: Proveedor[];
  newProducto: Producto ={
    id: 0,
    codPro: '',
    nomPro: '',
    proveedor: 0,
    stock: 0,
    precio : 0,
    fechaCompra: new Date(),
  }

  constructor(
    private productoService: ProductoService, 
    private proveedorService: ProveedorService, 
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(){
    //this.obtenerProducto();
    this.proveedorService.listar().subscribe(
      (data: any[]) => {
        this.proveedores = data;
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    )
  }

  obtenerProducto(){
    const id = this.route.snapshot.params['id'];
    this.productoService.obtenerProducto(id).subscribe(
      response =>{this.newProducto = response},
    );
  }
  registrarProducto() {
    console.log('Atencion llego con éxito: ',this.newProducto);
    
    this.productoService.registrar(this.newProducto).subscribe(
        Response => {
        console.log('Atencion Registrada con éxito: ', Response);
          this.newProducto = {
            id: 0,
            codPro: '',
            nomPro: '',
            proveedor: 0,
            stock: 0,
            precio : 0,
            fechaCompra: new Date(),
          };
          this.router.navigate(['/producto/listar']);
        },
        error =>{
          console.error('Error al registrar el producto',error)
        }
        
      );
      }
      regresar() {
        this.router.navigate(['producto/listar'])
      }

}
