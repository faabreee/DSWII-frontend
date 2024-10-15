import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  
  proveedores: Proveedor[];
  editProductos: Producto ={
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
  private route: ActivatedRoute) {
}
ngOnInit(){
  this.obtenerProducto();
}
obtenerProducto(){

  const id = this.route.snapshot.params['id'];
  console.log(id);
  this.productoService.obtenerProducto(id).subscribe(
    (data: any) => {
      this.editProductos = data;
      console.log(data);
      console.log(this.editProductos);
      this.proveedorService.getProveedores().subscribe(
        (data: any[]) => {
          this.proveedores = data;
        },
        (error) => {
          console.error('Error al obtener los proveedores', error);
        }
      )
    },
    (error) => {
      console.error('Error al obtener el producto', error);
    }
  );
  console.log(this.editProductos);
}
actualizarProducto() {
  this.productoService.editar(this.editProductos.id, this.editProductos).subscribe(response => {
    console.log('Producto registrado con exito', response);
    this.router.navigate(['producto/listar']);
    },
    error => {
      console.error('Error al registrar el producto', error);
    }
    );
  }
  regresar() {
    this.router.navigate(['producto/listar'])
  }
}