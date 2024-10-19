import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  productos: Producto[] = [];
  nomPro: String = "";

  constructor(private productoService: ProductoService,private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.listarProducto();
  }

  listarProducto() {
    this.productoService.listar().subscribe(data =>{
      this.productos = data;
    });
  }

  registrarProducto(){
    this.router.navigate(['producto/registrar'])
  }

  editarProducto(id: number){
    console.log(id);
    this.router.navigate(['producto/editar',id])
  }

  
  buscarProducto(name: String) {
    this.productoService.buscar(name).subscribe(data =>{
      this.productos = data;
    });
  }
  
  
  eliminarProducto(id: number) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productoService.eliminar(id).subscribe({
        next: () => {
          alert('Producto eliminado'); 
          this.listarProducto(); 
        },
        error: () => {
          alert('Producto eliminado'); 
          this.listarProducto(); 
        }
      });
    }
  }

  private actualizarListaProductos() {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
      console.log('Lista de productos actualizada.');
    });
  }


/*
eliminarProducto(id: number) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productoService.eliminar(id).subscribe(data =>{
        this.listarProducto();
      console.log('Producto eliminado con éxito');
        },
        error: (error) => {
          console.error('Error al eliminar el producto', error);
          alert('No se pudo eliminar el producto'); 
        }
      
      
      });
    }
  */
    detalleProducto(id: number) {
      this.router.navigate(['producto/detalle',id])
    }
  
    regresar() {
      this.router.navigate(['inicio'])
    }
   
  }